# FisEvo MVP

Frontend completo em HTML, CSS e JavaScript para Supabase + TACO.

## Configuração

O deploy.yml deve gerar `js/config.js` com:

```js
export const SUPABASE_URL='...';
export const SUPABASE_PUBLISHABLE_KEY='...';
```

Para teste local, copie `js/config.example.js` para `js/config.js` e preencha os valores. Não abra por `file://`; execute um servidor HTTP.

```bash
python -m http.server 8080
```

Abra `http://localhost:8080/login.html`.

## Colunas esperadas

- profiles: id, age, height, current_weight, calorie_goal, protein_goal, carb_goal, fat_goal
- foods: id, user_id, name, brand, reference_amount, reference_unit, calories, protein, carbs, fat
- meals: id, user_id, meal_date, type, name, created_at
- meal_items: id, meal_id, source, source_id, food_name, quantity, reference_amount, reference_unit, calories, protein, carbs, fat, calculated_calories, calculated_protein, calculated_carbs, calculated_fat
- weights: id, user_id, weight_date, value
- workouts: id, user_id, workout_date, type, duration, notes
- goal_history: id, user_id, effective_from, calorie_goal, protein_goal, carb_goal, fat_goal

As tabelas devem ter RLS e políticas de SELECT, INSERT, UPDATE e DELETE. Para meal_items, a política deve validar que a refeição associada pertence a `auth.uid()`.
