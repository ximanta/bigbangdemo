import React, { useState } from 'react';
import { Plus, Edit, Trash2, Heart, HeartOff } from 'lucide-react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import AlertMessage from '../components/AlertMessage';
import { mockRecipes, recipeTags } from '../data/mockData';

const Recipes = () => {
  const [recipes, setRecipes] = useState(mockRecipes);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '', show: false });

  const [newRecipe, setNewRecipe] = useState({
    name: '',
    image: '',
    ingredients: [{ item: '', quantity: '', unit: '' }],
    instructions: [''],
    tags: [],
    favorite: false,
  });

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type, show: true });
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = newRecipe.ingredients.map((ing, i) =>
      i === index ? { ...ing, [field]: value } : ing,
    );
    setNewRecipe((prev) => ({ ...prev, ingredients: updatedIngredients }));
  };

  const addIngredientField = () => {
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { item: '', quantity: '', unit: '' }],
    }));
  };

  const removeIngredientField = (index) => {
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = newRecipe.instructions.map((inst, i) =>
      i === index ? value : inst,
    );
    setNewRecipe((prev) => ({ ...prev, instructions: updatedInstructions }));
  };

  const addInstructionField = () => {
    setNewRecipe((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ''],
    }));
  };

  const removeInstructionField = (index) => {
    setNewRecipe((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }));
  };

  const handleTagToggle = (tag) => {
    setNewRecipe((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newRecipe.name || newRecipe.ingredients.length === 0 || !newRecipe.instructions[0]) {
      showAlert('Please fill in recipe name, ingredients, and instructions.', 'danger');
      return;
    }

    const cleanedRecipe = {
      ...newRecipe,
      ingredients: newRecipe.ingredients.filter(ing => ing.item && ing.quantity),
      instructions: newRecipe.instructions.filter(inst => inst.trim()),
    };

    if (editingRecipe) {
      setRecipes((prev) =>
        prev.map((recipe) =>
          recipe.id === editingRecipe.id ? { ...cleanedRecipe, id: recipe.id } : recipe,
        ),
      );
      showAlert('Recipe updated successfully!');
    } else {
      setRecipes((prev) => [
        ...prev,
        { ...cleanedRecipe, id: `rec${Date.now()}` },
      ]);
      showAlert('Recipe added successfully!');
    }
    resetForm();
  };

  const resetForm = () => {
    setNewRecipe({
      name: '',
      image: '',
      ingredients: [{ item: '', quantity: '', unit: '' }],
      instructions: [''],
      tags: [],
      favorite: false,
    });
    setEditingRecipe(null);
    setShowForm(false);
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setNewRecipe(recipe);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
      showAlert('Recipe deleted successfully!', 'danger');
    }
  };

  const toggleFavorite = (id) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe,
      ),
    );
    showAlert('Recipe favorite status updated!');
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <Header title="My Recipes" />
      <AlertMessage
        message={alert.message}
        type={alert.type}
        show={alert.show}
        onClose={closeAlert}
      />
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search recipes by name or tag"
      />
      <div className="container">
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus size={20} style={{ marginRight: '8px' }} />
          {showForm ? 'Hide Form' : 'Add New Recipe'}
        </Button>

        {showForm && (
          <div className="card" style={{ marginTop: '16px' }}>
            <h3>{editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={newRecipe.name}
                onChange={handleInputChange}
                placeholder="Recipe Name"
                className="input-field"
                required
              />
              <input
                type="text"
                name="image"
                value={newRecipe.image}
                onChange={handleInputChange}
                placeholder="Image URL (e.g. from Unsplash)"
                className="input-field"
              />

              <h4>Ingredients</h4>
              {newRecipe.ingredients.map((ing, index) => (
                <div key={index} className="flex-row" style={{ marginBottom: '8px' }}>
                  <input
                    type="text"
                    value={ing.item}
                    onChange={(e) => handleIngredientChange(index, 'item', e.target.value)}
                    placeholder="Item (e.g., Pasta)"
                    className="input-field"
                    style={{ flex: 2, marginRight: '8px', marginBottom: 0 }}
                    required
                  />
                  <input
                    type="number"
                    value={ing.quantity}
                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                    placeholder="Qty"
                    className="input-field"
                    style={{ flex: 1, marginRight: '8px', marginBottom: 0 }}
                    min="0"
                    required
                  />
                  <input
                    type="text"
                    value={ing.unit}
                    onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                    placeholder="Unit (e.g., gram)"
                    className="input-field"
                    style={{ flex: 1, marginRight: '8px', marginBottom: 0 }}
                  />
                  {newRecipe.ingredients.length > 1 && (
                    <button
                      type="button"
                      className="icon-button danger"
                      onClick={() => removeIngredientField(index)}
                      style={{ padding: '6px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={addIngredientField}
                variant="secondary"
                style={{ marginBottom: '16px' }}
              >
                Add Ingredient
              </Button>

              <h4>Instructions</h4>
              {newRecipe.instructions.map((inst, index) => (
                <div key={index} className="flex-row" style={{ marginBottom: '8px' }}>
                  <textarea
                    value={inst}
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    className="textarea-field"
                    style={{ flex: 1, marginRight: '8px', marginBottom: 0 }}
                    rows="3"
                    required
                  ></textarea>
                  {newRecipe.instructions.length > 1 && (
                    <button
                      type="button"
                      className="icon-button danger"
                      onClick={() => removeInstructionField(index)}
                      style={{ padding: '6px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={addInstructionField}
                variant="secondary"
                style={{ marginBottom: '16px' }}
              >
                Add Step
              </Button>

              <h4>Tags</h4>
              <div style={{ marginBottom: '16px' }}>
                {recipeTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`tag ${newRecipe.tags.includes(tag) ? 'active' : ''}`}
                    onClick={() => handleTagToggle(tag)}
                    style={{
                      backgroundColor: newRecipe.tags.includes(tag) ? 'var(--primary-color)' : '#e0e0e0',
                      color: newRecipe.tags.includes(tag) ? 'white' : 'var(--text-color)',
                      border: newRecipe.tags.includes(tag) ? '1px solid var(--primary-dark-color)' : '1px solid #ccc',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="flex-row" style={{ marginTop: '16px' }}>
                <Button type="submit" style={{ marginRight: '8px' }}>
                  {editingRecipe ? 'Save Changes' : 'Add Recipe'}
                </Button>
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <h2 style={{ marginTop: '24px', marginBottom: '16px' }}>Your Recipes</h2>
        {filteredRecipes.length === 0 ? (
          <p className="text-center text-light-color">No recipes found. Add some!</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="card">
              <div className="flex-row flex-space-between flex-align-start">
                <div style={{ flexGrow: 1, marginRight: '16px' }}>
                  <h3>{recipe.name}</h3>
                  {recipe.tags.length > 0 && (
                    <p className="text-small" style={{ marginBottom: '8px' }}>
                      {recipe.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </p>
                  )}
                  <p className="text-small">
                    <strong>Ingredients:</strong>
                  </p>
                  <ul style={{ margin: '0 0 8px 16px', padding: 0, listStyleType: 'disc' }}>
                    {recipe.ingredients.map((ing, index) => (
                      <li key={index} className="text-small">
                        {ing.quantity} {ing.unit} {ing.item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-small">
                    <strong>Instructions:</strong>
                  </p>
                  <ol style={{ margin: '0 0 8px 16px', padding: 0, listStyleType: 'decimal' }}>
                    {recipe.instructions.map((inst, index) => (
                      <li key={index} className="text-small">
                        {inst}
                      </li>
                    ))}
                  </ol>
                </div>
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      flexShrink: 0,
                    }}
                  />
                )}
              </div>
              <div className="flex-row" style={{ marginTop: '12px', justifyContent: 'flex-end' }}>
                <button
                  className="icon-button"
                  onClick={() => toggleFavorite(recipe.id)}
                  style={{ color: recipe.favorite ? 'var(--danger-color)' : 'var(--text-light-color)' }}
                >
                  {recipe.favorite ? <Heart fill="currentColor" size={20} /> : <Heart size={20} />}
                </button>
                <button className="icon-button primary" onClick={() => handleEdit(recipe)}>
                  <Edit size={20} />
                </button>
                <button className="icon-button danger" onClick={() => handleDelete(recipe.id)}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Recipes;
