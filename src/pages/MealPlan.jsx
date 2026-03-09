import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import AlertMessage from '../components/AlertMessage';
import { mockMealPlan, mockRecipes } from '../data/mockData';
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const MealPlan = () => {
  const [mealPlan, setMealPlan] = useState(mockMealPlan);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showRecipeSelector, setShowRecipeSelector] = useState(false);
  const [selectedMealSlot, setSelectedMealSlot] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '', show: false });

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type, show: true });
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // 0 for Sunday, 1 for Monday
  };

  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDayClick = (day) => {
    const dayString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDay(dayString);
    setShowRecipeSelector(true);
  };

  const handleAssignRecipe = (recipeId) => {
    if (selectedDay && selectedMealSlot) {
      setMealPlan((prev) => ({
        ...prev,
        [selectedDay]: {
          ...(prev[selectedDay] || { breakfast: null, lunch: null, dinner: null }),
          [selectedMealSlot]: recipeId,
        },
      }));
      showAlert('Recipe assigned to meal plan!');
      setShowRecipeSelector(false);
      setSelectedDay(null);
      setSelectedMealSlot(null);
    }
  };

  const handleRemoveRecipe = (dayString, slot) => {
    setMealPlan((prev) => ({
      ...prev,
      [dayString]: {
        ...(prev[dayString] || { breakfast: null, lunch: null, dinner: null }),
        [slot]: null,
      },
    }));
    showAlert('Meal removed from plan!', 'danger');
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth); // 0 = Sunday, 1 = Monday

    const calendarCells = [];
    const emptyCells = firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday start

    // Empty cells for days before the 1st of the month
    for (let i = 0; i < emptyCells; i++) {
      calendarCells.push(
        <div key={`empty-${i}`} className="calendar-day empty"></div>,
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const mealsForDay = mealPlan[dayString] || {};
      const todayString = new Date().toISOString().slice(0, 10);
      const isToday = dayString === todayString;
      const isSelected = dayString === selectedDay;

      calendarCells.push(
        <div
          key={dayString}
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDayClick(day)}
        >
          <div className="day-number">{day}</div>
          {mealsForDay.breakfast && (
            <div className="meal-indicator breakfast">
              {mockRecipes.find(r => r.id === mealsForDay.breakfast)?.name}
            </div>
          )}
          {mealsForDay.lunch && (
            <div className="meal-indicator lunch">
              {mockRecipes.find(r => r.id === mealsForDay.lunch)?.name}
            </div>
          )}
          {mealsForDay.dinner && (
            <div className="meal-indicator dinner">
              {mockRecipes.find(r => r.id === mealsForDay.dinner)?.name}
            </div>
          )}
        </div>,
      );
    }

    return calendarCells;
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <>
      <Header title="Meal Plan" />
      <AlertMessage
        message={alert.message}
        type={alert.type}
        show={alert.show}
        onClose={closeAlert}
      />
      <div className="container">
        <div className="flex-row flex-space-between" style={{ marginBottom: '16px' }}>
          <Button onClick={goToPreviousMonth} variant="secondary" style={{ padding: '8px 12px' }}>
            <ChevronLeft size={20} />
          </Button>
          <h2>{getMonthName(currentMonth)}</h2>
          <Button onClick={goToNextMonth} variant="secondary" style={{ padding: '8px 12px' }}>
            <ChevronRight size={20} />
          </Button>
        </div>

        <div className="calendar-grid-header">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
        <div className="calendar-grid">
          {renderCalendar()}
        </div>

        {selectedDay && (
          <div className="card" style={{ marginTop: '24px' }}>
            <h3>Meals for {formatDate(selectedDay)}</h3>
            {['breakfast', 'lunch', 'dinner'].map((slot) => (
              <div key={slot} className="flex-row flex-space-between" style={{ marginBottom: '8px' }}>
                <span style={{ textTransform: 'capitalize' }}>{slot}:</span>
                {mealPlan[selectedDay]?.[slot] ? (
                  <div className="flex-row">
                    <span style={{ marginRight: '8px' }}>
                      {mockRecipes.find(r => r.id === mealPlan[selectedDay][slot])?.name}
                    </span>
                    <button
                      className="icon-button danger"
                      onClick={() => handleRemoveRecipe(selectedDay, slot)}
                      style={{ padding: '4px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setSelectedMealSlot(slot);
                      setShowRecipeSelector(true);
                    }}
                    variant="secondary"
                    style={{ padding: '6px 10px', fontSize: '14px' }}
                  >
                    <Plus size={16} style={{ marginRight: '4px' }} />
                    Add Recipe
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}

        {showRecipeSelector && selectedDay && (
          <div className="card" style={{ marginTop: '24px' }}>
            <h3>Select a Recipe for {formatDate(selectedDay)} - {selectedMealSlot}</h3>
            {mockRecipes.length === 0 ? (
              <p>No recipes available. Go to the Recipes tab to add some!</p>
            ) : (
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {mockRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="flex-row flex-space-between card"
                    onClick={() => handleAssignRecipe(recipe.id)}
                    style={{
                      padding: '10px',
                      cursor: 'pointer',
                      marginBottom: '8px',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <span>{recipe.name}</span>
                    <Button
                      style={{ padding: '6px 10px', fontSize: '14px' }}
                      onClick={() => handleAssignRecipe(recipe.id)}
                    >
                      Select
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <Button
              variant="secondary"
              onClick={() => { setShowRecipeSelector(false); setSelectedDay(null); setSelectedMealSlot(null); }}
              style={{ marginTop: '16px' }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
      <style>{`
        .calendar-grid-header, .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }
        .calendar-grid-header div {
          font-weight: bold;
          text-align: center;
          padding: 8px 0;
          color: var(--primary-color);
        }
        .calendar-day {
          background-color: var(--surface-color);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 8px;
          min-height: 80px;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.1s ease;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .calendar-day.empty {
          background-color: var(--background-color);
          cursor: default;
          opacity: 0.6;
        }
        .calendar-day:not(.empty):hover {
          background-color: rgba(var(--primary-color-rgb), 0.05);
          transform: translateY(-1px);
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .calendar-day.today {
          border: 2px solid var(--primary-color);
          box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
        }
        .calendar-day.selected {
          background-color: rgba(var(--primary-color-rgb), 0.1);
          border: 2px solid var(--primary-dark-color);
        }
        .day-number {
          font-weight: bold;
          margin-bottom: 4px;
          font-size: 1.1em;
          color: var(--text-color);
        }
        .meal-indicator {
          font-size: 0.75em;
          padding: 2px 6px;
          border-radius: 4px;
          margin-top: 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%;
          color: white;
          background-color: #a5d6a7; /* Light green */
        }
        .meal-indicator.breakfast { background-color: #81c784; }
        .meal-indicator.lunch { background-color: #66bb6a; }
        .meal-indicator.dinner { background-color: var(--primary-color); }
      `}</style>
    </>
  );
};

export default MealPlan;
