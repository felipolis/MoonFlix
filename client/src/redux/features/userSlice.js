import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "User",
	initialState: { // é o estado inicial da aplicação quando o usuário não está logado
		user: null,
		listFavorites: [],
	},
	reducers: {	// são as ações que podem ser disparadas
		setUser: (state, action) => {
			if (action.payload === null) {	// se o usuário estiver deslogando, remove o token do localStorage
				localStorage.removeItem("actkn");
			} else {
				if (action.payload.token) {	// se o usuário estiver logando, salva o token no localStorage
					localStorage.setItem("actkn", action.payload.token);
				}
			}

			state.user = action.payload;
		},

		setListFavorites: (state, action) => {
			state.listFavorites = action.payload;
		},

		removeFavorite: (state, action) => {
			const { mediaId } = action.payload;
			state.listFavorites = [...state.listFavorites.filter((e) => e.mediaId.toString() !== mediaId.toString())];
		},

		addFavorite: (state, action) => {
			state.listFavorites = [action.payload, ...state.listFavorites]
		}
	}

});

export const {
	setUser,
	setListFavorites,
	removeFavorite,
	addFavorite
} = userSlice.actions;

export default userSlice.reducer;