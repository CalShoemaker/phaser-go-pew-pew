import Api from '../../api/index';
const API = new Api();

const state = () =>({
    score: 0,
    levels: []
})

const getters = {
    score: (state) => { return state.score; },
    levels: (state) => { return state.levels; }
}

const actions = {
    increaseScore({ commit }, increment) {
        commit('updateScore', increment);
    },
    setLevels({ commit }, levels) {
        commit('updateLevels', (levels ? levels : API.getLevels()));
    },
    setScore({ commit }, score) {
        commit('setScore', (score ? score : API.getScore()))
    }
}

const mutations = {
    updateScore(state, increment) {
        state.score + increment;
    },
    setScore(state, score) {
        state.score = score
    },
    updateLevels(state, levels) {
        state.levels = levels;
    }
}

export default {
    namespaced: true,
    state, 
    getters,
    actions,
    mutations
}