import { __extends, __spread, __values } from 'tslib';
import { Directive, TemplateRef, ContentChild, EventEmitter, HostBinding, Input, Output, Injectable, Component, ContentChildren, ViewEncapsulation, forwardRef, Host, HostListener, Optional, NgModule } from '@angular/core';
import { isBoolean } from 'util';
import { CommonModule } from '@angular/common';

var WizardStepTitleDirective = /** @class */ (function () {
    function WizardStepTitleDirective(templateRef) {
        this.templateRef = templateRef;
    }
    return WizardStepTitleDirective;
}());
WizardStepTitleDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ng-template[awStepTitle], ng-template[awWizardStepTitle]'
            },] },
];
WizardStepTitleDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
]; };
var WizardStep = /** @class */ (function () {
    function WizardStep() {
        this.navigationSymbol = { symbol: '' };
        this.completed = false;
        this.selected = false;
        this.defaultSelected = false;
        this.optional = false;
        this.canEnter = true;
        this.canExit = true;
        this.stepEnter = new EventEmitter();
        this.stepExit = new EventEmitter();
    }
    Object.defineProperty(WizardStep.prototype, "hidden", {
        get: function () {
            return !this.selected;
        },
        enumerable: true,
        configurable: true
    });
    WizardStep.canTransitionStep = function (condition, direction) {
        if (isBoolean(condition)) {
            return Promise.resolve((condition));
        }
        else if (condition instanceof Function) {
            return Promise.resolve(condition(direction));
        }
        else {
            return Promise.reject(new Error("Input value '" + condition + "' is neither a boolean nor a function"));
        }
    };
    WizardStep.prototype.enter = function (direction) {
        this.stepEnter.emit(direction);
    };
    WizardStep.prototype.exit = function (direction) {
        this.stepExit.emit(direction);
    };
    WizardStep.prototype.canEnterStep = function (direction) {
        return WizardStep.canTransitionStep(this.canEnter, direction);
    };
    WizardStep.prototype.canExitStep = function (direction) {
        return WizardStep.canTransitionStep(this.canExit, direction);
    };
    return WizardStep;
}());
WizardStep.propDecorators = {
    "stepTitleTemplate": [{ type: ContentChild, args: [WizardStepTitleDirective,] },],
    "stepId": [{ type: Input },],
    "stepTitle": [{ type: Input },],
    "navigationSymbol": [{ type: Input },],
    "canEnter": [{ type: Input },],
    "canExit": [{ type: Input },],
    "stepEnter": [{ type: Output },],
    "stepExit": [{ type: Output },],
    "hidden": [{ type: HostBinding, args: ['hidden',] },],
};
var MovingDirection = {
    Forwards: 0,
    Backwards: 1,
    Stay: 2,
};
MovingDirection[MovingDirection.Forwards] = "Forwards";
MovingDirection[MovingDirection.Backwards] = "Backwards";
MovingDirection[MovingDirection.Stay] = "Stay";
var NavigationMode = /** @class */ (function () {
    function NavigationMode(wizardState) {
        this.wizardState = wizardState;
    }
    NavigationMode.prototype.goToPreviousStep = function (preFinalize, postFinalize) {
        if (this.wizardState.hasPreviousStep()) {
            this.goToStep(this.wizardState.currentStepIndex - 1, preFinalize, postFinalize);
        }
    };
    NavigationMode.prototype.goToNextStep = function (preFinalize, postFinalize) {
        if (this.wizardState.hasNextStep()) {
            this.goToStep(this.wizardState.currentStepIndex + 1, preFinalize, postFinalize);
        }
    };
    return NavigationMode;
}());
var FreeNavigationMode = /** @class */ (function (_super) {
    __extends(FreeNavigationMode, _super);
    function FreeNavigationMode(wizardState) {
        return _super.call(this, wizardState) || this;
    }
    FreeNavigationMode.prototype.canGoToStep = function (destinationIndex) {
        var _this = this;
        var hasStep = this.wizardState.hasStep(destinationIndex);
        var movingDirection = this.wizardState.getMovingDirection(destinationIndex);
        var canExitCurrentStep = function (previous) {
            return previous ? _this.wizardState.currentStep.canExitStep(movingDirection) : Promise.resolve(false);
        };
        var canEnterDestinationStep = function (previous) {
            return previous ? _this.wizardState.getStepAtIndex(destinationIndex).canEnterStep(movingDirection) : Promise.resolve(false);
        };
        return Promise.resolve(hasStep)
            .then(canExitCurrentStep)
            .then(canEnterDestinationStep);
    };
    FreeNavigationMode.prototype.goToStep = function (destinationIndex, preFinalize, postFinalize) {
        var _this = this;
        this.canGoToStep(destinationIndex).then(function (navigationAllowed) {
            if (navigationAllowed) {
                var movingDirection = _this.wizardState.getMovingDirection(destinationIndex);
                if (preFinalize) {
                    preFinalize.emit();
                }
                _this.wizardState.currentStep.completed = true;
                _this.wizardState.currentStep.exit(movingDirection);
                _this.wizardState.currentStep.selected = false;
                _this.wizardState.currentStepIndex = destinationIndex;
                _this.wizardState.currentStep.enter(movingDirection);
                _this.wizardState.currentStep.selected = true;
                if (postFinalize) {
                    postFinalize.emit();
                }
            }
            else {
                _this.wizardState.currentStep.exit(MovingDirection.Stay);
                _this.wizardState.currentStep.enter(MovingDirection.Stay);
            }
        });
    };
    FreeNavigationMode.prototype.isNavigable = function (destinationIndex) {
        return true;
    };
    FreeNavigationMode.prototype.reset = function () {
        if (!this.wizardState.hasStep(this.wizardState.defaultStepIndex)) {
            throw new Error("The wizard doesn't contain a step with index " + this.wizardState.defaultStepIndex);
        }
        this.wizardState.wizardSteps.forEach(function (step) {
            step.completed = false;
            step.selected = false;
        });
        this.wizardState.currentStepIndex = this.wizardState.defaultStepIndex;
        this.wizardState.currentStep.selected = true;
        this.wizardState.currentStep.enter(MovingDirection.Forwards);
    };
    return FreeNavigationMode;
}(NavigationMode));
var WizardCompletionStep = /** @class */ (function (_super) {
    __extends(WizardCompletionStep, _super);
    function WizardCompletionStep() {
        var _this = _super.apply(this, __spread(arguments)) || this;
        _this.stepExit = new EventEmitter();
        _this.canExit = false;
        return _this;
    }
    WizardCompletionStep.prototype.enter = function (direction) {
        this.completed = true;
        this.stepEnter.emit(direction);
    };
    WizardCompletionStep.prototype.exit = function (direction) {
        this.completed = false;
        this.stepExit.emit(direction);
    };
    return WizardCompletionStep;
}(WizardStep));
var SemiStrictNavigationMode = /** @class */ (function (_super) {
    __extends(SemiStrictNavigationMode, _super);
    function SemiStrictNavigationMode(wizardState) {
        return _super.call(this, wizardState) || this;
    }
    SemiStrictNavigationMode.prototype.canGoToStep = function (destinationIndex) {
        var _this = this;
        var hasStep = this.wizardState.hasStep(destinationIndex);
        var movingDirection = this.wizardState.getMovingDirection(destinationIndex);
        var canExitCurrentStep = function (previous) {
            return previous ? _this.wizardState.currentStep.canExitStep(movingDirection) : Promise.resolve(false);
        };
        var canEnterDestinationStep = function (previous) {
            return previous ? _this.wizardState.getStepAtIndex(destinationIndex).canEnterStep(movingDirection) : Promise.resolve(false);
        };
        var destinationStep = function (previous) {
            if (previous) {
                var allNormalStepsCompleted = _this.wizardState.wizardSteps
                    .filter(function (step, index) { return index < destinationIndex; })
                    .every(function (step) { return step.completed || step.optional || step.selected; });
                return Promise.resolve(!(_this.wizardState.getStepAtIndex(destinationIndex) instanceof WizardCompletionStep) || allNormalStepsCompleted);
            }
            else {
                return Promise.resolve(false);
            }
        };
        return Promise.resolve(hasStep)
            .then(canExitCurrentStep)
            .then(canEnterDestinationStep)
            .then(destinationStep);
    };
    SemiStrictNavigationMode.prototype.goToStep = function (destinationIndex, preFinalize, postFinalize) {
        var _this = this;
        this.canGoToStep(destinationIndex).then(function (navigationAllowed) {
            if (navigationAllowed) {
                var movingDirection = _this.wizardState.getMovingDirection(destinationIndex);
                if (preFinalize) {
                    preFinalize.emit();
                }
                _this.wizardState.currentStep.completed = true;
                _this.wizardState.currentStep.exit(movingDirection);
                _this.wizardState.currentStep.selected = false;
                _this.wizardState.currentStepIndex = destinationIndex;
                _this.wizardState.currentStep.enter(movingDirection);
                _this.wizardState.currentStep.selected = true;
                if (postFinalize) {
                    postFinalize.emit();
                }
            }
            else {
                _this.wizardState.currentStep.exit(MovingDirection.Stay);
                _this.wizardState.currentStep.enter(MovingDirection.Stay);
            }
        });
    };
    SemiStrictNavigationMode.prototype.isNavigable = function (destinationIndex) {
        if (this.wizardState.getStepAtIndex(destinationIndex) instanceof WizardCompletionStep) {
            return this.wizardState.wizardSteps.filter(function (step, index) { return index < destinationIndex; })
                .every(function (step) { return step.completed || step.optional || step.selected; });
        }
        else {
            return true;
        }
    };
    SemiStrictNavigationMode.prototype.reset = function () {
        if (!this.wizardState.hasStep(this.wizardState.defaultStepIndex)) {
            throw new Error("The wizard doesn't contain a step with index " + this.wizardState.defaultStepIndex);
        }
        var defaultCompletionStep = this.wizardState.getStepAtIndex(this.wizardState.defaultStepIndex) instanceof WizardCompletionStep &&
            this.wizardState.wizardSteps.length !== 1;
        if (defaultCompletionStep) {
            throw new Error("The default step index " + this.wizardState.defaultStepIndex + " references a completion step");
        }
        this.wizardState.wizardSteps.forEach(function (step) {
            step.completed = false;
            step.selected = false;
        });
        this.wizardState.currentStepIndex = this.wizardState.defaultStepIndex;
        this.wizardState.currentStep.selected = true;
        this.wizardState.currentStep.enter(MovingDirection.Forwards);
    };
    return SemiStrictNavigationMode;
}(NavigationMode));
var StrictNavigationMode = /** @class */ (function (_super) {
    __extends(StrictNavigationMode, _super);
    function StrictNavigationMode(wizardState) {
        return _super.call(this, wizardState) || this;
    }
    StrictNavigationMode.prototype.canGoToStep = function (destinationIndex) {
        var _this = this;
        var hasStep = this.wizardState.hasStep(destinationIndex);
        var movingDirection = this.wizardState.getMovingDirection(destinationIndex);
        var canExitCurrentStep = function (previous) {
            return previous ? _this.wizardState.currentStep.canExitStep(movingDirection) : Promise.resolve(false);
        };
        var canEnterDestinationStep = function (previous) {
            return previous ? _this.wizardState.getStepAtIndex(destinationIndex).canEnterStep(movingDirection) : Promise.resolve(false);
        };
        var allPreviousStepsComplete = function (previous) {
            if (previous) {
                return Promise.resolve(_this.wizardState.wizardSteps
                    .filter(function (step, index) { return index < destinationIndex && index !== _this.wizardState.currentStepIndex; })
                    .every(function (step) { return step.completed || step.optional; }));
            }
            else {
                return Promise.resolve(false);
            }
        };
        return Promise.resolve(hasStep)
            .then(canExitCurrentStep)
            .then(canEnterDestinationStep)
            .then(allPreviousStepsComplete);
    };
    StrictNavigationMode.prototype.goToStep = function (destinationIndex, preFinalize, postFinalize) {
        var _this = this;
        this.canGoToStep(destinationIndex).then(function (navigationAllowed) {
            if (navigationAllowed) {
                var movingDirection = _this.wizardState.getMovingDirection(destinationIndex);
                if (preFinalize) {
                    preFinalize.emit();
                }
                _this.wizardState.currentStep.completed = true;
                _this.wizardState.currentStep.exit(movingDirection);
                _this.wizardState.currentStep.selected = false;
                _this.wizardState.wizardSteps
                    .filter(function (step, index) { return _this.wizardState.currentStepIndex > destinationIndex && index > destinationIndex; })
                    .forEach(function (step) { return step.completed = false; });
                _this.wizardState.currentStepIndex = destinationIndex;
                _this.wizardState.currentStep.enter(movingDirection);
                _this.wizardState.currentStep.selected = true;
                if (postFinalize) {
                    postFinalize.emit();
                }
            }
            else {
                _this.wizardState.currentStep.exit(MovingDirection.Stay);
                _this.wizardState.currentStep.enter(MovingDirection.Stay);
            }
        });
    };
    StrictNavigationMode.prototype.isNavigable = function (destinationIndex) {
        return destinationIndex < this.wizardState.currentStepIndex;
    };
    StrictNavigationMode.prototype.reset = function () {
        var _this = this;
        if (!this.wizardState.hasStep(this.wizardState.defaultStepIndex)) {
            throw new Error("The wizard doesn't contain a step with index " + this.wizardState.defaultStepIndex);
        }
        var illegalDefaultStep = this.wizardState.wizardSteps
            .filter(function (step, index) { return index < _this.wizardState.defaultStepIndex; })
            .some(function (step) { return !step.optional; });
        if (illegalDefaultStep) {
            throw new Error("The default step index " + this.wizardState.defaultStepIndex + " is located after a non optional step");
        }
        this.wizardState.wizardSteps.forEach(function (step) {
            step.completed = false;
            step.selected = false;
        });
        this.wizardState.currentStepIndex = this.wizardState.defaultStepIndex;
        this.wizardState.currentStep.selected = true;
        this.wizardState.currentStep.enter(MovingDirection.Forwards);
    };
    return StrictNavigationMode;
}(NavigationMode));
function navigationModeFactory(navigationMode, wizardState) {
    switch (navigationMode) {
        case 'free':
            return new FreeNavigationMode(wizardState);
        case 'semi-strict':
            return new SemiStrictNavigationMode(wizardState);
        case 'strict':
        default:
            return new StrictNavigationMode(wizardState);
    }
}
var WizardState = /** @class */ (function () {
    function WizardState() {
        this._defaultStepIndex = 0;
        this.wizardSteps = [];
        this.currentStepIndex = -1;
    }
    Object.defineProperty(WizardState.prototype, "defaultStepIndex", {
        get: function () {
            var foundDefaultStep = this.wizardSteps.find(function (step) { return step.defaultSelected; });
            if (foundDefaultStep) {
                return this.getIndexOfStep(foundDefaultStep);
            }
            else {
                return this._defaultStepIndex;
            }
        },
        set: function (defaultStepIndex) {
            this._defaultStepIndex = defaultStepIndex;
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(WizardState.prototype, "currentStep", {
        get: function () {
            if (this.hasStep(this.currentStepIndex)) {
                return this.wizardSteps[this.currentStepIndex];
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardState.prototype, "completed", {
        get: function () {
            return this.wizardSteps.every(function (step) { return step.completed || step.optional; });
        },
        enumerable: true,
        configurable: true
    });
    WizardState.prototype.updateNavigationMode = function (updatedNavigationMode) {
        this.navigationMode = navigationModeFactory(updatedNavigationMode, this);
    };
    WizardState.prototype.updateWizardSteps = function (updatedWizardSteps) {
        if (this.wizardSteps.length > 0 && this.currentStepIndex > -1) {
            this.currentStepIndex = updatedWizardSteps.indexOf(this.wizardSteps[this.currentStepIndex]);
        }
        this.wizardSteps = updatedWizardSteps;
    };
    WizardState.prototype.hasStep = function (stepIndex) {
        return this.wizardSteps.length > 0 && 0 <= stepIndex && stepIndex < this.wizardSteps.length;
    };
    WizardState.prototype.hasPreviousStep = function () {
        return this.hasStep(this.currentStepIndex - 1);
    };
    WizardState.prototype.hasNextStep = function () {
        return this.hasStep(this.currentStepIndex + 1);
    };
    WizardState.prototype.isLastStep = function () {
        return this.wizardSteps.length > 0 && this.currentStepIndex === this.wizardSteps.length - 1;
    };
    WizardState.prototype.getStepAtIndex = function (stepIndex) {
        if (!this.hasStep(stepIndex)) {
            throw new Error("Expected a known step, but got stepIndex: " + stepIndex + ".");
        }
        return this.wizardSteps[stepIndex];
    };
    WizardState.prototype.getIndexOfStepWithId = function (stepId) {
        return this.wizardSteps.findIndex(function (step) { return step.stepId === stepId; });
    };
    WizardState.prototype.getIndexOfStep = function (step) {
        return this.wizardSteps.indexOf(step);
    };
    WizardState.prototype.getMovingDirection = function (destinationStep) {
        var movingDirection;
        if (destinationStep > this.currentStepIndex) {
            movingDirection = MovingDirection.Forwards;
        }
        else if (destinationStep < this.currentStepIndex) {
            movingDirection = MovingDirection.Backwards;
        }
        else {
            movingDirection = MovingDirection.Stay;
        }
        return movingDirection;
    };
    return WizardState;
}());
WizardState.decorators = [
    { type: Injectable },
];
WizardState.ctorParameters = function () { return []; };
var WizardComponent = /** @class */ (function () {
    function WizardComponent(model) {
        this.model = model;
        this.navBarLocation = 'top';
        this.navBarLayout = 'small';
        this.navBarDirection = 'left-to-right';
        this.navigationMode = 'strict';
        this.defaultStepIndex = 0;
        this.disableNavigationBar = false;
    }
    Object.defineProperty(WizardComponent.prototype, "horizontalOrientation", {
        get: function () {
            return this.navBarLocation === 'top' || this.navBarLocation === 'bottom';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardComponent.prototype, "verticalOrientation", {
        get: function () {
            return this.navBarLocation === 'left' || this.navBarLocation === 'right';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardComponent.prototype, "navigation", {
        get: function () {
            return this.model.navigationMode;
        },
        enumerable: true,
        configurable: true
    });
    WizardComponent.prototype.ngOnChanges = function (changes) {
        try {
            for (var _a = __values(Object.keys(changes)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var propName = _b.value;
                var change = changes[propName];
                if (!change.firstChange) {
                    switch (propName) {
                        case 'defaultStepIndex':
                            this.model.defaultStepIndex = parseInt(change.currentValue, 10);
                            break;
                        case 'disableNavigationBar':
                            this.model.disableNavigationBar = change.currentValue;
                            break;
                        case 'navigationMode':
                            this.model.updateNavigationMode(change.currentValue);
                            break;
                        default:
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    WizardComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.wizardSteps.changes.subscribe(function (changedWizardSteps) {
            _this.model.updateWizardSteps(changedWizardSteps.toArray());
        });
        this.model.disableNavigationBar = this.disableNavigationBar;
        this.model.defaultStepIndex = this.defaultStepIndex;
        this.model.updateWizardSteps(this.wizardSteps.toArray());
        this.model.updateNavigationMode(this.navigationMode);
        this.navigation.reset();
    };
    return WizardComponent;
}());
WizardComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-wizard',
                template: "<aw-wizard-navigation-bar\n  [direction]=\"navBarDirection\"\n  *ngIf=\"navBarLocation == 'top' || navBarLocation == 'left'\"\n  [ngClass]=\"{\n    vertical: navBarLocation == 'left',\n    horizontal: navBarLocation == 'top',\n    small: navBarLayout == 'small',\n    'large-filled': navBarLayout == 'large-filled',\n    'large-filled-symbols': navBarLayout == 'large-filled-symbols',\n    'large-empty': navBarLayout == 'large-empty',\n    'large-empty-symbols': navBarLayout == 'large-empty-symbols'\n  }\">\n</aw-wizard-navigation-bar>\n<div [ngClass]=\"{\n  'wizard-steps': true,\n  vertical: navBarLocation == 'left' || navBarLocation == 'right',\n  horizontal: navBarLocation == 'top' || navBarLocation == 'bottom'\n}\">\n  <ng-content></ng-content>\n</div>\n<aw-wizard-navigation-bar\n  [direction]=\"navBarDirection\"\n  *ngIf=\"navBarLocation == 'bottom' || navBarLocation == 'right'\"\n  [ngClass]=\"{\n    vertical: navBarLocation == 'right',\n    horizontal: navBarLocation == 'bottom',\n    small: navBarLayout == 'small',\n    'large-filled': navBarLayout == 'large-filled',\n    'large-filled-symbols': navBarLayout == 'large-filled-symbols',\n    'large-empty': navBarLayout == 'large-empty',\n    'large-empty-symbols': navBarLayout == 'large-empty-symbols'\n  }\">\n</aw-wizard-navigation-bar>\n",
                styles: ["aw-wizard{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}aw-wizard.vertical{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}aw-wizard.horizontal{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}aw-wizard .wizard-steps{top:0;display:-webkit-box;display:-ms-flexbox;display:flex}aw-wizard .wizard-steps.vertical{min-width:calc(100% - 280px);width:80%;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}aw-wizard .wizard-steps.horizontal{width:100%;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}"],
                encapsulation: ViewEncapsulation.None,
                providers: [WizardState]
            },] },
];
WizardComponent.ctorParameters = function () { return [
    { type: WizardState, },
]; };
WizardComponent.propDecorators = {
    "wizardSteps": [{ type: ContentChildren, args: [WizardStep,] },],
    "navBarLocation": [{ type: Input },],
    "navBarLayout": [{ type: Input },],
    "navBarDirection": [{ type: Input },],
    "navigationMode": [{ type: Input },],
    "defaultStepIndex": [{ type: Input },],
    "disableNavigationBar": [{ type: Input },],
    "horizontalOrientation": [{ type: HostBinding, args: ['class.horizontal',] },],
    "verticalOrientation": [{ type: HostBinding, args: ['class.vertical',] },],
};
var WizardCompletionStepComponent = /** @class */ (function (_super) {
    __extends(WizardCompletionStepComponent, _super);
    function WizardCompletionStepComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WizardCompletionStepComponent;
}(WizardCompletionStep));
WizardCompletionStepComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-wizard-completion-step',
                template: "<ng-content></ng-content>\n",
                styles: ["aw-wizard-completion-step{height:auto;width:100%}"],
                encapsulation: ViewEncapsulation.None,
                providers: [
                    { provide: WizardStep, useExisting: forwardRef(function () { return WizardCompletionStepComponent; }) },
                    { provide: WizardCompletionStep, useExisting: forwardRef(function () { return WizardCompletionStepComponent; }) }
                ]
            },] },
];
WizardCompletionStepComponent.ctorParameters = function () { return []; };
var WizardNavigationBarComponent = /** @class */ (function () {
    function WizardNavigationBarComponent(wizardState) {
        this.wizardState = wizardState;
        this.direction = 'left-to-right';
    }
    Object.defineProperty(WizardNavigationBarComponent.prototype, "navigationMode", {
        get: function () {
            return this.wizardState.navigationMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationBarComponent.prototype, "wizardSteps", {
        get: function () {
            switch (this.direction) {
                case 'right-to-left':
                    return this.wizardState.wizardSteps.slice().reverse();
                case 'left-to-right':
                default:
                    return this.wizardState.wizardSteps;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationBarComponent.prototype, "numberOfWizardSteps", {
        get: function () {
            return this.wizardState.wizardSteps.length;
        },
        enumerable: true,
        configurable: true
    });
    WizardNavigationBarComponent.prototype.isCurrent = function (wizardStep) {
        return wizardStep.selected && !wizardStep.completed && !this.wizardState.completed;
    };
    WizardNavigationBarComponent.prototype.isDone = function (wizardStep) {
        return (wizardStep.completed && !wizardStep.selected) || this.wizardState.completed;
    };
    WizardNavigationBarComponent.prototype.isDefault = function (wizardStep) {
        return !wizardStep.optional && !wizardStep.completed && !wizardStep.selected && !this.wizardState.completed;
    };
    WizardNavigationBarComponent.prototype.isEditing = function (wizardStep) {
        return wizardStep.selected && wizardStep.completed && !this.wizardState.completed;
    };
    WizardNavigationBarComponent.prototype.isOptional = function (wizardStep) {
        return wizardStep.optional && !wizardStep.completed && !wizardStep.selected && !this.wizardState.completed;
    };
    WizardNavigationBarComponent.prototype.isNavigable = function (wizardStep) {
        return !wizardStep.selected && !this.wizardState.disableNavigationBar &&
            this.navigationMode.isNavigable(this.wizardState.getIndexOfStep(wizardStep));
    };
    return WizardNavigationBarComponent;
}());
WizardNavigationBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-wizard-navigation-bar',
                template: "<div></div>",
                styles: ["aw-wizard-navigation-bar.horizontal.small ul.steps-indicator{padding:24px 0 10px}aw-wizard-navigation-bar.horizontal.small ul.steps-indicator li:not(:last-child):before{background-color:#e6e6e6;content:'';position:absolute;height:1px;width:calc(100% - 14px);top:-7px;left:calc(50% + 7px)}aw-wizard-navigation-bar.horizontal.small ul.steps-indicator li:after{position:absolute;top:-14px;left:calc(50% - 7px);width:14px;height:14px;content:'';text-align:center;vertical-align:middle;line-height:14px;-webkit-transition:.25s;transition:.25s;border-radius:100%;background-color:#e6e6e6}aw-wizard-navigation-bar.horizontal.small ul.steps-indicator li.default a:hover{color:grey}aw-wizard-navigation-bar.horizontal.small ul.steps-indicator li.current:after{background-color:grey}aw-wizard-navigation-bar.horizontal.small ul.steps-indicator li.done:after{background-color:#393}aw-wizard-navigation-bar.horizontal.small ul.steps-indicator li.optional:after{background-color:#38ef38}aw-wizard-navigation-bar.horizontal.small ul.steps-indicator li.editing:after{background-color:red}aw-wizard-navigation-bar.horizontal.large-filled ul.steps-indicator{padding:60px 0 10px}aw-wizard-navigation-bar.horizontal.large-filled ul.steps-indicator li:not(:last-child):before{background-color:#e6e6e6;content:'';position:absolute;height:1px;width:calc(100% - 50px);top:-25px;left:calc(50% + 25px)}aw-wizard-navigation-bar.horizontal.large-filled ul.steps-indicator li:after{position:absolute;top:-50px;left:calc(50% - 25px);width:50px;height:50px;content:'';text-align:center;vertical-align:middle;line-height:50px;-webkit-transition:.25s;transition:.25s;border-radius:100%;background-color:#e6e6e6}aw-wizard-navigation-bar.horizontal.large-filled ul.steps-indicator li.default a:hover{color:grey}aw-wizard-navigation-bar.horizontal.large-filled ul.steps-indicator li.current:after{background-color:grey}aw-wizard-navigation-bar.horizontal.large-filled ul.steps-indicator li.done:after{background-color:#393}aw-wizard-navigation-bar.horizontal.large-filled ul.steps-indicator li.optional:after{background-color:#38ef38}aw-wizard-navigation-bar.horizontal.large-filled ul.steps-indicator li.editing:after{background-color:red}aw-wizard-navigation-bar.horizontal.large-empty ul.steps-indicator{padding:60px 0 10px}aw-wizard-navigation-bar.horizontal.large-empty ul.steps-indicator li:not(:last-child):before{background-color:#e6e6e6;content:'';position:absolute;height:1px;width:calc(100% - 50px);top:-25px;left:calc(50% + 25px)}aw-wizard-navigation-bar.horizontal.large-empty ul.steps-indicator li:after{position:absolute;top:-50px;left:calc(50% - 25px);width:50px;height:50px;content:'';text-align:center;vertical-align:middle;line-height:46px;-webkit-transition:.25s;transition:.25s;border-radius:100%;border:2px solid #e6e6e6}aw-wizard-navigation-bar.horizontal.large-empty ul.steps-indicator li.default a:hover{color:grey}aw-wizard-navigation-bar.horizontal.large-empty ul.steps-indicator li.current:after{border:2px solid grey}aw-wizard-navigation-bar.horizontal.large-empty ul.steps-indicator li.done:after{border:2px solid #393}aw-wizard-navigation-bar.horizontal.large-empty ul.steps-indicator li.optional:after{border:2px solid #38ef38}aw-wizard-navigation-bar.horizontal.large-empty ul.steps-indicator li.editing:after{border:2px solid red}aw-wizard-navigation-bar.horizontal.large-filled-symbols ul.steps-indicator{padding:60px 0 10px}aw-wizard-navigation-bar.horizontal.large-filled-symbols ul.steps-indicator li:not(:last-child):before{background-color:#e6e6e6;content:'';position:absolute;height:1px;width:calc(100% - 50px);top:-25px;left:calc(50% + 25px)}aw-wizard-navigation-bar.horizontal.large-filled-symbols ul.steps-indicator li:after{position:absolute;top:-50px;left:calc(50% - 25px);width:50px;height:50px;content:'';text-align:center;vertical-align:middle;line-height:50px;-webkit-transition:.25s;transition:.25s;border-radius:100%;background-color:#e6e6e6;color:#000;content:attr(step-symbol)}aw-wizard-navigation-bar.horizontal.large-filled-symbols ul.steps-indicator li.default a:hover{color:grey}aw-wizard-navigation-bar.horizontal.large-filled-symbols ul.steps-indicator li.current:after{background-color:grey;color:#000}aw-wizard-navigation-bar.horizontal.large-filled-symbols ul.steps-indicator li.done:after{background-color:#393;color:#000}aw-wizard-navigation-bar.horizontal.large-filled-symbols ul.steps-indicator li.optional:after{background-color:#38ef38;color:#000}aw-wizard-navigation-bar.horizontal.large-filled-symbols ul.steps-indicator li.editing:after{background-color:red;color:#000}aw-wizard-navigation-bar.horizontal.large-empty-symbols ul.steps-indicator{padding:60px 0 10px}aw-wizard-navigation-bar.horizontal.large-empty-symbols ul.steps-indicator li:not(:last-child):before{background-color:#e6e6e6;content:'';position:absolute;height:1px;width:calc(100% - 50px);top:-25px;left:calc(50% + 25px)}aw-wizard-navigation-bar.horizontal.large-empty-symbols ul.steps-indicator li:after{position:absolute;top:-50px;left:calc(50% - 25px);width:50px;height:50px;content:'';text-align:center;vertical-align:middle;line-height:46px;-webkit-transition:.25s;transition:.25s;border-radius:100%;color:#e6e6e6;content:attr(step-symbol);border:2px solid #e6e6e6}aw-wizard-navigation-bar.horizontal.large-empty-symbols ul.steps-indicator li.default a:hover{color:grey}aw-wizard-navigation-bar.horizontal.large-empty-symbols ul.steps-indicator li.current:after{color:grey;border:2px solid grey}aw-wizard-navigation-bar.horizontal.large-empty-symbols ul.steps-indicator li.done:after{color:#393;border:2px solid #393}aw-wizard-navigation-bar.horizontal.large-empty-symbols ul.steps-indicator li.optional:after{color:#38ef38;border:2px solid #38ef38}aw-wizard-navigation-bar.horizontal.large-empty-symbols ul.steps-indicator li.editing:after{color:red;border:2px solid red}aw-wizard-navigation-bar.horizontal ul.steps-indicator{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;right:0;bottom:0;left:0;margin:0;width:100%;list-style:none}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-2:before{left:25%;right:25%}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-2 li{width:50%}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-3:before{left:16.66666667%;right:16.66666667%}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-3 li{width:33.33333333%}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-4:before{left:12.5%;right:12.5%}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-4 li{width:25%}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-5:before{left:10%;right:10%}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-5 li{width:20%}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-6:before{left:8.33333333%;right:8.33333333%}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-6 li{width:16.66666667%}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-7:before{left:7.14285714%;right:7.14285714%}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-7 li{width:14.28571429%}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-8:before{left:6.25%;right:6.25%}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-8 li{width:12.5%}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-9:before{left:5.55555556%;right:5.55555556%}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-9 li{width:11.11111111%}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-10:before{left:5%;right:5%}aw-wizard-navigation-bar.horizontal ul.steps-indicator.steps-10 li{width:10%}aw-wizard-navigation-bar.horizontal ul.steps-indicator *{-webkit-box-sizing:border-box;box-sizing:border-box}aw-wizard-navigation-bar.horizontal ul.steps-indicator li{position:relative;margin:0;padding:10px 0 0;pointer-events:none}aw-wizard-navigation-bar.horizontal ul.steps-indicator li div{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}aw-wizard-navigation-bar.horizontal ul.steps-indicator li div a{color:grey;line-height:14px;font-size:14px;text-decoration:none;text-transform:uppercase;text-align:center;font-weight:700;-webkit-transition:.25s;transition:.25s;cursor:pointer}aw-wizard-navigation-bar.horizontal ul.steps-indicator li div a:hover{color:#4d4d4d}aw-wizard-navigation-bar.horizontal ul.steps-indicator li.navigable{pointer-events:auto}", "aw-wizard-navigation-bar.vertical{max-width:280px;width:20%;height:100%;position:-webkit-sticky;position:sticky;top:0}aw-wizard-navigation-bar.vertical.small ul.steps-indicator{padding:5px 5px 5px 19px}aw-wizard-navigation-bar.vertical.small ul.steps-indicator li:not(:last-child):before{background-color:#e6e6e6;content:'';position:absolute;left:-7px;top:14px;height:calc(100% - 14px);width:1px}aw-wizard-navigation-bar.vertical.small ul.steps-indicator li:after{position:absolute;top:0;left:-14px;width:14px;height:14px;content:'';text-align:center;vertical-align:middle;line-height:14px;-webkit-transition:.25s;transition:.25s;border-radius:100%;background-color:#e6e6e6}aw-wizard-navigation-bar.vertical.small ul.steps-indicator li div{min-height:14px}aw-wizard-navigation-bar.vertical.small ul.steps-indicator li.default a:hover{color:grey}aw-wizard-navigation-bar.vertical.small ul.steps-indicator li.current:after{background-color:grey}aw-wizard-navigation-bar.vertical.small ul.steps-indicator li.done:after{background-color:#393}aw-wizard-navigation-bar.vertical.small ul.steps-indicator li.optional:after{background-color:#38ef38}aw-wizard-navigation-bar.vertical.small ul.steps-indicator li.editing:after{background-color:red}aw-wizard-navigation-bar.vertical.large-filled ul.steps-indicator{padding:5px 5px 5px 55px}aw-wizard-navigation-bar.vertical.large-filled ul.steps-indicator li:not(:last-child):before{background-color:#e6e6e6;content:'';position:absolute;left:-25px;top:50px;height:calc(100% - 50px);width:1px}aw-wizard-navigation-bar.vertical.large-filled ul.steps-indicator li:after{position:absolute;top:0;left:-50px;width:50px;height:50px;content:'';text-align:center;vertical-align:middle;line-height:50px;-webkit-transition:.25s;transition:.25s;border-radius:100%;background-color:#e6e6e6}aw-wizard-navigation-bar.vertical.large-filled ul.steps-indicator li div{min-height:50px}aw-wizard-navigation-bar.vertical.large-filled ul.steps-indicator li.default a:hover{color:grey}aw-wizard-navigation-bar.vertical.large-filled ul.steps-indicator li.current:after{background-color:grey}aw-wizard-navigation-bar.vertical.large-filled ul.steps-indicator li.done:after{background-color:#393}aw-wizard-navigation-bar.vertical.large-filled ul.steps-indicator li.optional:after{background-color:#38ef38}aw-wizard-navigation-bar.vertical.large-filled ul.steps-indicator li.editing:after{background-color:red}aw-wizard-navigation-bar.vertical.large-empty ul.steps-indicator{padding:5px 5px 5px 55px}aw-wizard-navigation-bar.vertical.large-empty ul.steps-indicator li:not(:last-child):before{background-color:#e6e6e6;content:'';position:absolute;left:-25px;top:50px;height:calc(100% - 50px);width:1px}aw-wizard-navigation-bar.vertical.large-empty ul.steps-indicator li:after{position:absolute;top:0;left:-50px;width:50px;height:50px;content:'';text-align:center;vertical-align:middle;line-height:46px;-webkit-transition:.25s;transition:.25s;border-radius:100%;border:2px solid #e6e6e6}aw-wizard-navigation-bar.vertical.large-empty ul.steps-indicator li div{min-height:54px}aw-wizard-navigation-bar.vertical.large-empty ul.steps-indicator li.default a:hover{color:grey}aw-wizard-navigation-bar.vertical.large-empty ul.steps-indicator li.current:after{border:2px solid grey}aw-wizard-navigation-bar.vertical.large-empty ul.steps-indicator li.done:after{border:2px solid #393}aw-wizard-navigation-bar.vertical.large-empty ul.steps-indicator li.optional:after{border:2px solid #38ef38}aw-wizard-navigation-bar.vertical.large-empty ul.steps-indicator li.editing:after{border:2px solid red}aw-wizard-navigation-bar.vertical.large-filled-symbols ul.steps-indicator{padding:5px 5px 5px 55px}aw-wizard-navigation-bar.vertical.large-filled-symbols ul.steps-indicator li:not(:last-child):before{background-color:#e6e6e6;content:'';position:absolute;left:-25px;top:50px;height:calc(100% - 50px);width:1px}aw-wizard-navigation-bar.vertical.large-filled-symbols ul.steps-indicator li:after{position:absolute;top:0;left:-50px;width:50px;height:50px;content:'';text-align:center;vertical-align:middle;line-height:50px;-webkit-transition:.25s;transition:.25s;border-radius:100%;background-color:#e6e6e6;color:#000;content:attr(step-symbol)}aw-wizard-navigation-bar.vertical.large-filled-symbols ul.steps-indicator li div{min-height:50px}aw-wizard-navigation-bar.vertical.large-filled-symbols ul.steps-indicator li.default a:hover{color:grey}aw-wizard-navigation-bar.vertical.large-filled-symbols ul.steps-indicator li.current:after{background-color:grey;color:#000}aw-wizard-navigation-bar.vertical.large-filled-symbols ul.steps-indicator li.done:after{background-color:#393;color:#000}aw-wizard-navigation-bar.vertical.large-filled-symbols ul.steps-indicator li.optional:after{background-color:#38ef38;color:#000}aw-wizard-navigation-bar.vertical.large-filled-symbols ul.steps-indicator li.editing:after{background-color:red;color:#000}aw-wizard-navigation-bar.vertical.large-empty-symbols ul.steps-indicator{padding:5px 5px 5px 55px}aw-wizard-navigation-bar.vertical.large-empty-symbols ul.steps-indicator li:not(:last-child):before{background-color:#e6e6e6;content:'';position:absolute;left:-25px;top:50px;height:calc(100% - 50px);width:1px}aw-wizard-navigation-bar.vertical.large-empty-symbols ul.steps-indicator li:after{position:absolute;top:0;left:-50px;width:50px;height:50px;content:'';text-align:center;vertical-align:middle;line-height:46px;-webkit-transition:.25s;transition:.25s;border-radius:100%;color:#e6e6e6;content:attr(step-symbol);border:2px solid #e6e6e6}aw-wizard-navigation-bar.vertical.large-empty-symbols ul.steps-indicator li div{min-height:54px}aw-wizard-navigation-bar.vertical.large-empty-symbols ul.steps-indicator li.default a:hover{color:grey}aw-wizard-navigation-bar.vertical.large-empty-symbols ul.steps-indicator li.current:after{color:grey;border:2px solid grey}aw-wizard-navigation-bar.vertical.large-empty-symbols ul.steps-indicator li.done:after{color:#393;border:2px solid #393}aw-wizard-navigation-bar.vertical.large-empty-symbols ul.steps-indicator li.optional:after{color:#38ef38;border:2px solid #38ef38}aw-wizard-navigation-bar.vertical.large-empty-symbols ul.steps-indicator li.editing:after{color:red;border:2px solid red}aw-wizard-navigation-bar.vertical ul.steps-indicator{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;list-style:none;margin:auto}aw-wizard-navigation-bar.vertical ul.steps-indicator *{-webkit-box-sizing:border-box;box-sizing:border-box}aw-wizard-navigation-bar.vertical ul.steps-indicator li{position:relative;pointer-events:none}aw-wizard-navigation-bar.vertical ul.steps-indicator li:not(:last-child){margin-bottom:0;padding-bottom:10px}aw-wizard-navigation-bar.vertical ul.steps-indicator li div{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center}aw-wizard-navigation-bar.vertical ul.steps-indicator li div a{color:grey;margin-left:15px;line-height:14px;font-size:14px;text-decoration:none;text-transform:uppercase;text-align:left;font-weight:700;-webkit-transition:.25s;transition:.25s;cursor:pointer}aw-wizard-navigation-bar.vertical ul.steps-indicator li div a:hover{color:#4d4d4d}aw-wizard-navigation-bar.vertical ul.steps-indicator li.navigable{pointer-events:auto}"],
                encapsulation: ViewEncapsulation.None,
            },] },
];
WizardNavigationBarComponent.ctorParameters = function () { return [
    { type: WizardState, },
]; };
WizardNavigationBarComponent.propDecorators = {
    "direction": [{ type: Input },],
};
var WizardStepComponent = /** @class */ (function (_super) {
    __extends(WizardStepComponent, _super);
    function WizardStepComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WizardStepComponent;
}(WizardStep));
WizardStepComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-wizard-step',
                template: "<ng-content></ng-content>\n",
                styles: ["aw-wizard-step{height:auto;width:100%}"],
                encapsulation: ViewEncapsulation.None,
                providers: [
                    { provide: WizardStep, useExisting: forwardRef(function () { return WizardStepComponent; }) }
                ]
            },] },
];
WizardStepComponent.ctorParameters = function () { return []; };
var EnableBackLinksDirective = /** @class */ (function () {
    function EnableBackLinksDirective(completionStep) {
        this.completionStep = completionStep;
        this.stepExit = new EventEmitter();
    }
    EnableBackLinksDirective.prototype.ngOnInit = function () {
        this.completionStep.canExit = true;
        this.completionStep.stepExit = this.stepExit;
    };
    return EnableBackLinksDirective;
}());
EnableBackLinksDirective.decorators = [
    { type: Directive, args: [{
                selector: '[awEnableBackLinks]'
            },] },
];
EnableBackLinksDirective.ctorParameters = function () { return [
    { type: WizardCompletionStep, decorators: [{ type: Host },] },
]; };
EnableBackLinksDirective.propDecorators = {
    "stepExit": [{ type: Output },],
};
function isStepOffset(value) {
    return value.hasOwnProperty('stepOffset');
}
function isStepId(value) {
    return value.hasOwnProperty('stepId') && !(value instanceof WizardStep);
}
function isStepIndex(value) {
    return value.hasOwnProperty('stepIndex');
}
var GoToStepDirective = /** @class */ (function () {
    function GoToStepDirective(wizardState, wizardStep) {
        this.wizardState = wizardState;
        this.wizardStep = wizardStep;
        this.preFinalize = new EventEmitter();
        this.postFinalize = new EventEmitter();
    }
    Object.defineProperty(GoToStepDirective.prototype, "finalize", {
        get: function () {
            return this.preFinalize;
        },
        set: function (emitter) {
            this.preFinalize = emitter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoToStepDirective.prototype, "navigationMode", {
        get: function () {
            return this.wizardState.navigationMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoToStepDirective.prototype, "destinationStep", {
        get: function () {
            var destinationStep;
            if (isStepIndex(this.targetStep)) {
                destinationStep = this.targetStep.stepIndex;
            }
            else if (isStepId(this.targetStep)) {
                destinationStep = this.wizardState.getIndexOfStepWithId(this.targetStep.stepId);
            }
            else if (isStepOffset(this.targetStep) && this.wizardStep !== null) {
                destinationStep = this.wizardState.getIndexOfStep(this.wizardStep) + this.targetStep.stepOffset;
            }
            else if (this.targetStep instanceof WizardStep) {
                destinationStep = this.wizardState.getIndexOfStep(this.targetStep);
            }
            else {
                throw new Error("Input 'targetStep' is neither a WizardStep, StepOffset, StepIndex or StepId");
            }
            return destinationStep;
        },
        enumerable: true,
        configurable: true
    });
    GoToStepDirective.prototype.onClick = function (event) {
        this.navigationMode.goToStep(this.destinationStep, this.preFinalize, this.postFinalize);
    };
    return GoToStepDirective;
}());
GoToStepDirective.decorators = [
    { type: Directive, args: [{
                selector: '[awGoToStep]'
            },] },
];
GoToStepDirective.ctorParameters = function () { return [
    { type: WizardState, },
    { type: WizardStep, decorators: [{ type: Optional },] },
]; };
GoToStepDirective.propDecorators = {
    "preFinalize": [{ type: Output },],
    "postFinalize": [{ type: Output },],
    "finalize": [{ type: Output },],
    "targetStep": [{ type: Input, args: ['awGoToStep',] },],
    "onClick": [{ type: HostListener, args: ['click', ['$event'],] },],
};
var NextStepDirective = /** @class */ (function () {
    function NextStepDirective(wizardState) {
        this.wizardState = wizardState;
        this.preFinalize = new EventEmitter();
        this.postFinalize = new EventEmitter();
    }
    Object.defineProperty(NextStepDirective.prototype, "finalize", {
        get: function () {
            return this.preFinalize;
        },
        set: function (emitter) {
            this.preFinalize = emitter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NextStepDirective.prototype, "navigationMode", {
        get: function () {
            return this.wizardState.navigationMode;
        },
        enumerable: true,
        configurable: true
    });
    NextStepDirective.prototype.onClick = function (event) {
        this.navigationMode.goToNextStep(this.preFinalize, this.postFinalize);
    };
    return NextStepDirective;
}());
NextStepDirective.decorators = [
    { type: Directive, args: [{
                selector: '[awNextStep]'
            },] },
];
NextStepDirective.ctorParameters = function () { return [
    { type: WizardState, },
]; };
NextStepDirective.propDecorators = {
    "preFinalize": [{ type: Output },],
    "postFinalize": [{ type: Output },],
    "finalize": [{ type: Output },],
    "onClick": [{ type: HostListener, args: ['click', ['$event'],] },],
};
var OptionalStepDirective = /** @class */ (function () {
    function OptionalStepDirective(wizardStep) {
        this.wizardStep = wizardStep;
    }
    OptionalStepDirective.prototype.ngOnInit = function () {
        this.wizardStep.optional = true;
    };
    return OptionalStepDirective;
}());
OptionalStepDirective.decorators = [
    { type: Directive, args: [{
                selector: '[awOptionalStep]'
            },] },
];
OptionalStepDirective.ctorParameters = function () { return [
    { type: WizardStep, decorators: [{ type: Host },] },
]; };
var PreviousStepDirective = /** @class */ (function () {
    function PreviousStepDirective(wizardState) {
        this.wizardState = wizardState;
        this.preFinalize = new EventEmitter();
        this.postFinalize = new EventEmitter();
    }
    Object.defineProperty(PreviousStepDirective.prototype, "finalize", {
        get: function () {
            return this.preFinalize;
        },
        set: function (emitter) {
            this.preFinalize = emitter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PreviousStepDirective.prototype, "navigationMode", {
        get: function () {
            return this.wizardState.navigationMode;
        },
        enumerable: true,
        configurable: true
    });
    PreviousStepDirective.prototype.onClick = function (event) {
        this.navigationMode.goToPreviousStep(this.preFinalize, this.postFinalize);
    };
    return PreviousStepDirective;
}());
PreviousStepDirective.decorators = [
    { type: Directive, args: [{
                selector: '[awPreviousStep]'
            },] },
];
PreviousStepDirective.ctorParameters = function () { return [
    { type: WizardState, },
]; };
PreviousStepDirective.propDecorators = {
    "preFinalize": [{ type: Output },],
    "postFinalize": [{ type: Output },],
    "finalize": [{ type: Output },],
    "onClick": [{ type: HostListener, args: ['click', ['$event'],] },],
};
var ResetWizardDirective = /** @class */ (function () {
    function ResetWizardDirective(wizardState) {
        this.wizardState = wizardState;
        this.finalize = new EventEmitter();
    }
    Object.defineProperty(ResetWizardDirective.prototype, "navigationMode", {
        get: function () {
            return this.wizardState.navigationMode;
        },
        enumerable: true,
        configurable: true
    });
    ResetWizardDirective.prototype.onClick = function (event) {
        this.finalize.emit();
        this.navigationMode.reset();
    };
    return ResetWizardDirective;
}());
ResetWizardDirective.decorators = [
    { type: Directive, args: [{
                selector: '[awResetWizard]'
            },] },
];
ResetWizardDirective.ctorParameters = function () { return [
    { type: WizardState, },
]; };
ResetWizardDirective.propDecorators = {
    "finalize": [{ type: Output },],
    "onClick": [{ type: HostListener, args: ['click', ['$event'],] },],
};
var SelectedStepDirective = /** @class */ (function () {
    function SelectedStepDirective(wizardStep) {
        this.wizardStep = wizardStep;
    }
    SelectedStepDirective.prototype.ngOnInit = function () {
        this.wizardStep.defaultSelected = true;
    };
    return SelectedStepDirective;
}());
SelectedStepDirective.decorators = [
    { type: Directive, args: [{
                selector: '[awSelectedStep]'
            },] },
];
SelectedStepDirective.ctorParameters = function () { return [
    { type: WizardStep, decorators: [{ type: Host },] },
]; };
var WizardCompletionStepDirective = /** @class */ (function (_super) {
    __extends(WizardCompletionStepDirective, _super);
    function WizardCompletionStepDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WizardCompletionStepDirective;
}(WizardCompletionStep));
WizardCompletionStepDirective.decorators = [
    { type: Directive, args: [{
                selector: '[awWizardCompletionStep]',
                providers: [
                    { provide: WizardStep, useExisting: forwardRef(function () { return WizardCompletionStepDirective; }) },
                    { provide: WizardCompletionStep, useExisting: forwardRef(function () { return WizardCompletionStepDirective; }) }
                ]
            },] },
];
WizardCompletionStepDirective.ctorParameters = function () { return []; };
var WizardStepDirective = /** @class */ (function (_super) {
    __extends(WizardStepDirective, _super);
    function WizardStepDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WizardStepDirective;
}(WizardStep));
WizardStepDirective.decorators = [
    { type: Directive, args: [{
                selector: '[awWizardStep]',
                providers: [
                    { provide: WizardStep, useExisting: forwardRef(function () { return WizardStepDirective; }) }
                ]
            },] },
];
WizardStepDirective.ctorParameters = function () { return []; };
var ArchwizardModule = /** @class */ (function () {
    function ArchwizardModule() {
    }
    ArchwizardModule.forRoot = function () {
        return { ngModule: ArchwizardModule, providers: [] };
    };
    return ArchwizardModule;
}());
ArchwizardModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    WizardComponent,
                    WizardStepComponent,
                    WizardNavigationBarComponent,
                    WizardCompletionStepComponent,
                    GoToStepDirective,
                    NextStepDirective,
                    PreviousStepDirective,
                    OptionalStepDirective,
                    WizardStepTitleDirective,
                    EnableBackLinksDirective,
                    WizardStepDirective,
                    WizardCompletionStepDirective,
                    SelectedStepDirective,
                    ResetWizardDirective
                ],
                imports: [
                    CommonModule
                ],
                exports: [
                    WizardComponent,
                    WizardStepComponent,
                    WizardNavigationBarComponent,
                    WizardCompletionStepComponent,
                    GoToStepDirective,
                    NextStepDirective,
                    PreviousStepDirective,
                    OptionalStepDirective,
                    WizardStepTitleDirective,
                    EnableBackLinksDirective,
                    WizardStepDirective,
                    WizardCompletionStepDirective,
                    SelectedStepDirective,
                    ResetWizardDirective
                ]
            },] },
];
ArchwizardModule.ctorParameters = function () { return []; };

export { ArchwizardModule, WizardComponent, WizardCompletionStepComponent, WizardNavigationBarComponent, WizardStepComponent, EnableBackLinksDirective, GoToStepDirective, NextStepDirective, OptionalStepDirective, PreviousStepDirective, ResetWizardDirective, SelectedStepDirective, WizardCompletionStepDirective, WizardStepDirective, WizardStepTitleDirective, FreeNavigationMode, NavigationMode, SemiStrictNavigationMode, StrictNavigationMode, WizardState, navigationModeFactory, MovingDirection, WizardCompletionStep, WizardStep, isStepId, isStepIndex, isStepOffset, WizardCompletionStepComponent as ɵg, WizardNavigationBarComponent as ɵf, WizardStepComponent as ɵe, WizardComponent as ɵa, EnableBackLinksDirective as ɵm, GoToStepDirective as ɵi, NextStepDirective as ɵj, OptionalStepDirective as ɵl, PreviousStepDirective as ɵk, ResetWizardDirective as ɵq, SelectedStepDirective as ɵp, WizardCompletionStepDirective as ɵo, WizardStepTitleDirective as ɵd, WizardStepDirective as ɵn, WizardState as ɵb, WizardCompletionStep as ɵh, WizardStep as ɵc };
//# sourceMappingURL=angular-archwizard.js.map
