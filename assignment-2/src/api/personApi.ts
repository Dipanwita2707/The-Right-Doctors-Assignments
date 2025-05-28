import axios from 'axios';
import { Person } from '../types/Person';

const API_URL = 'http://localhost:5000/api/person';

export const getPersons = async (): Promise<Person[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching persons:', error);
    throw error;
  }
};

export const getPerson = async (id: string): Promise<Person> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching person with id ${id}:`, error);
    throw error;
  }
};

export const createPerson = async (personData: Omit<Person, '_id'>): Promise<Person> => {
  try {
    const response = await axios.post(API_URL, personData);
    return response.data;
  } catch (error) {
    console.error('Error creating person:', error);
    throw error;
  }
};

export const updatePerson = async (id: string, personData: Omit<Person, '_id'>): Promise<Person> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, personData);
    return response.data;
  } catch (error) {
    console.error(`Error updating person with id ${id}:`, error);
    throw error;
  }
};

export const deletePerson = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting person with id ${id}:`, error);
    throw error;
  }
};