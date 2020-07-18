import React, { useState } from 'react';

// changed to (axiosWithAuth)
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' },
};

const ColorList = ({ colors, updateColors, getColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addForm, setAddForm] = useState(false);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  //addColor here
  const addColor = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/colors', colorToEdit)
      .then((res) => {
        console.log('new color should show yes', res);
        getColors();
      })
      .catch((err) => console.log(err));
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    axiosWithAuth()
      // think about where will you get the id from...
      .put(`api/colors/${colorToEdit.id}`, colorToEdit)
      // where is is saved right now?
      .then((res) => {
        console.log('updated the color', res);
        getColors();
      })
      .catch((err) => console.log(err));
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`, color)
      .then((res) => {
        getColors();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className='delete'
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <div className='button-row'>
        <button onClick={() => setAddForm(true)}>Add New Color</button>
      </div>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button
              onClick={() => {
                setEditing(false);
                setColorToEdit(initialColor);
              }}
            >
              cancel
            </button>
          </div>
        </form>
      )}
      {/* Sretch  */}
      {addForm && (
        <form onSubmit={addColor}>
          <legend>Add a new color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>add</button>
            <button
              onClick={() => {
                setAddForm(false);
                setColorToEdit(initialColor);
              }}
            >
              cancel
            </button>
          </div>
        </form>
      )}
      <div className='spacer' />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};
export default ColorList;
