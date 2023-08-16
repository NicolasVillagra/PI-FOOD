// CustomHooks.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../redux/actions';
import { filterDiets, apiFn, dataBaseFn } from './utils';

export const useRecipesData = () => {
  const recipeDb = useSelector(state => state.Post); //MI ESTADO GLOBAL PARA COMUNICAR HOME CON SEARCH
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  const [originalState, setOriginalState] = useState([]); // estado original
  const [orderedCards, setOrderedCards] = useState([]); // cards ordenadas
  const [dietsFilter, setDietsFilter] = useState(""); // recetas por dieta
  const [cardsPerPage, setCardsPerPage] = useState(9); // cantidad de cards por pagina
  const [currentPage, setcurrentPage] = useState(1); // pagina inicial
  const lastIndex = currentPage * cardsPerPage
  const firstIndex = lastIndex - cardsPerPage

                        //si hay info en el dietsFilter filtro por dietas , si no devulve todas
  const filteredCards = dietsFilter ? filterDiets(recipeDb, dietsFilter) : recipeDb;
  const totalRecipeFilter = filteredCards.length;

  const fetchData = () => { //traigo toda las recetas
    axios.get('http://localhost:3001/recipes')
      .then(response => {
        const recipes = response.data;
        dispatch(updateFormData(recipes));
        setCards(recipes);
        setOriginalState(recipes);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
        window.alert('Error al obtener los datos de la API:', error)
      });
  };

  const handleChange = event => {
    setDietsFilter(event.target.value.toLowerCase());
  };

  const filterToDb = () => { //FILTRO POR DATA BASE
    const filter = dataBaseFn(originalState);
    dispatch(updateFormData(filter));
  };

  const filterToApi = () => { //FILTRO POR API
    const filter = apiFn(originalState);
    dispatch(updateFormData(filter));
  };

  useEffect(() => {
    dispatch(updateFormData(orderedCards));
  }, [orderedCards]);

  return {
    lastIndex,
    firstIndex,
    dietsFilter,
    cardsPerPage,
    currentPage,
    filteredCards,
    totalRecipeFilter,
    fetchData,
    handleChange,
    filterToDb,
    filterToApi,
    setcurrentPage,
    setCardsPerPage
  };
};