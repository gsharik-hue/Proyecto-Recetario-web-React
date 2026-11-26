<section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Últimas recetas
          </h2>

          <Link
            to="/recipes"
            className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition"
          >
            Ver todas
          </Link>
        </div>

        {loading && <Spinner loading={loading} />}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favoriteIds.includes(String(recipe.id))}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </section>