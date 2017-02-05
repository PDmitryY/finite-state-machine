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
        };
        this.currentState = this.config.initial;
        this.statesHistory = [];
    }
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        if(this.currentState === this.config.initial){
            return this.config.initial;
        } else {
            return this.currentState;
        };
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.currentState !== state){
            this.currentState = state;
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {}

    /**
     * Resets FSM state to initial.
     */
    reset() {}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
