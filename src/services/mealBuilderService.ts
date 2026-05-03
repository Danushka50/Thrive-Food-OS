import API, { resolveApiAssetUrl } from './apiClient';
import type {
  ThriveIngredient,
  ThriveIngredientCategory,
  ThriveIngredientsResponse,
  ThriveLocationsResponse,
} from '../types/types';

const hydrateIngredient = (
  ingredient: ThriveIngredient,
  category: ThriveIngredientCategory,
): ThriveIngredient => ({
  ...ingredient,
  show_specification: category.show_specification,
  show_cook_type: category.show_cook_type,
  photo_url: resolveApiAssetUrl(ingredient.photo_url),
  photos: (ingredient.photos || []).map((photo) => ({
    ...photo,
    photo_url: resolveApiAssetUrl(photo.photo_url) || photo.photo_url,
  })),
});

export const getFoodOsLocations = async () => {
  const response = await API.get<ThriveLocationsResponse>('/integrations/thrive-food-os/locations');
  return response.data.data;
};

export const getFoodOsIngredients = async (locationId: string) => {
  const response = await API.get<ThriveIngredientsResponse>('/integrations/thrive-food-os/ingredients', {
    params: { location_id: locationId },
    headers: { 'X-Location-Id': locationId },
  });

  return {
    ...response.data,
    data: (response.data.data || []).map((category) => ({
      ...category,
      ingredients: (category.ingredients || []).map((ingredient) => hydrateIngredient(ingredient, category)),
    })),
  };
};
