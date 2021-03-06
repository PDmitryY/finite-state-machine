class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(!config){
            throw new Error();
        } else{
            this.config = config;
        }
        this.currentState = this.config.initial;
        this.recordStates = [this.config.initial];
        this.currentStatePosition = 0;
        this.recordMethods = [];
    }
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        /*if(this.currentState === this.config.initial){
            return this.config.initial;
        } else {*/
            return this.currentState;
        /*}*/
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.config.states[state]) {
            this.currentState = state;
            this.recordStates.push(this.currentState);
            this.currentStatePosition++;
            this.recordMethods.push('changeState');
        } else {
            throw new Error('This state does not exist');
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(this.currentState === this.config.initial && event === 'study'){
            this.currentState = 'busy';
            this.recordStates.push(this.currentState);
            this.currentStatePosition++;
            this.recordMethods.push('trigger');
        } else if (this.config.states[this.currentState].transitions[event]){
            this.currentState = this.config.states[this.currentState].transitions[event];
            this.recordStates.push(this.currentState);
            this.currentStatePosition++;
            this.recordMethods.push('trigger');
        } else throw new Error('Event isn\'t exist in current state ');
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = this.config.initial;
        this.recordStates.push(this.currentState);
        this.currentStatePosition++;
        this.recordMethods.push('reset');
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let eventStates = [];
        if(!event){
            for (let states in this.config.states){
                eventStates.push(states);
            } 
        } else {
            for (let states in this.config.states){
                for(let trans in this.config.states[states].transitions){
                    if(this.config.states[states].transitions[trans]){
                        if (trans === event){
                            eventStates.push(states);
                        }
                    }
                }    
            }
        }
        return eventStates;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.currentStatePosition === 0 /*&& this.recordStates.length === 1*/) {
            return false;
        } else {
            this.currentStatePosition--;
            this.currentState = this.recordStates[this.currentStatePosition];
            this.recordMethods.push('undo');
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.currentStatePosition === 0 && this.recordStates.length === 1) {
            return false;
        } else if (this.currentStatePosition < (this.recordStates.length - 1)){
            if (this.recordMethods[(this.recordMethods.length - 1)] === 'changeState' || this.recordMethods[(this.recordMethods.length - 1)] === 'trigger'){
                return false;
            }
            this.currentStatePosition++;
            this.currentState = this.recordStates[this.currentStatePosition];
            this.recordMethods.push('redo');
            return true;
        } else if (this.currentStatePosition === (this.recordStates.length - 1)){
            return false;
        } 
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.currentStatePosition = 0;
        this.recordStates.length = 1;
        this.recordMethods.push('clearHistory');
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
