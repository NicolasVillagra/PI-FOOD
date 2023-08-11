// CustomHooks.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../redux/actions';
import { orderToAZ, orderToZA, filterDiets, apiFn, dataBaseFn } from './utils';

export const useRecipesData = () => {
  const recipeDb = useSelector(state => state.Post);
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  const [originalState, setOriginalState] = useState([]);
  const [orderedCards, setOrderedCards] = useState([]);
  const [dietsFilter, setDietsFilter] = useState('');
  const [cardsPerPage, setCardsPerPage] = useState(9);
  const [currentPage, setcurrentPage] = useState(1);
  const lastIndex = currentPage * cardsPerPage
  const firstIndex = lastIndex - cardsPerPage

  const filteredCards = dietsFilter ? filterDiets(recipeDb, dietsFilter) : recipeDb;
  const totalRecipeFilter = filteredCards.length;

  const fetchData = () => {
    axios.get('http://localhost:3001/recipes')
      .then(response => {
        const recipes = response.data;
        dispatch(updateFormData(recipes));
        setCards(recipes);
        setOriginalState(recipes);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
      });
  };

  const orderArrayAtoZ = () => {
    const arrayAtoZ = orderToAZ(filteredCards);
    setOrderedCards(arrayAtoZ);
  };

  const orderArrayZtoA = () => {
    const arrayZtoA = orderToZA(filteredCards);
    setOrderedCards(arrayZtoA);
  };

  const handleChange = event => {
    setDietsFilter(event.target.value.toLowerCase());
  };

  const filterToDb = () => {
    const filter = dataBaseFn(originalState);
    dispatch(updateFormData(filter));
  };

  const filterToApi = () => {
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
    orderArrayAtoZ,
    orderArrayZtoA,
    handleChange,
    filterToDb,
    filterToApi,
    setcurrentPage,
    setCardsPerPage
  };
};