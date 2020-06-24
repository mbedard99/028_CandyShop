const { google } = require('googleapis');
const express = require('express');
const app = express();

const port = process.env.port || 8080;
app.listen(port, () => {
    console.log('CandyShop API listening on port ', port)
});

app.get('/:id', async (req, res) => {
    const id = req.params.id;
    const ingredient = await getIngredients(id);
    if (!ingredient) {
        res.status(404).json({status: `${id} not found`                
        });
        return;
    }
    res.json({
        status: 'success',
        data: {ingredient: ingredient}
    })
});

async function getIngredients(id) {

    const auth = await google.auth.getClient({
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    const api = google.sheets({ version: 'v4', auth });
    const response = await api.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: `${process.env.TAB_ID}!A:E`

    })
    for (let row of response.data.values)
        if (row[0] == id) {
            return {
                id: row[0],
                name: row[1],
                amount: row[2],
                unit: row[3],
                warehouseLocation: row[4]
            }
        }
}
