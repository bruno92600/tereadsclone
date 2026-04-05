"use client";
import Container from "@/components/layouts/Container";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import SearchCard from "@/components/search/SearchCard";
import { User } from "@/types/user";
import axios from "axios";
import { Search, UserSearch } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (searchQuery = "") => {
    try {
      setLoading(true);

      const res = await axios.get("/api/users/search", {
        params: {
          q: searchQuery,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("SEARCH_ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers(query);
    }, 400);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <Container title="Rechercher">
      <div className="flex items-center gap-3 py-3 px-4 bg-background border border-border rounded-xl">
        <Search size={18} className="text-text-muted" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Rechercher"
          className="w-full bg-transparent text-sm text-white placeholder:text-text-muted focus:outline-none"
        />
      </div>
      <h2 className="font-semibold text-purple-500 my-4">
        {query ? "Résultats de la recherche" : "Suggestions pour vous"}
      </h2>

      {loading && <LoadingSpinner />}

      {!loading && users.length === 0 && (
        <div className="flex flex-col items-center justify-center py-14 text-text-muted space-y-4">
          <UserSearch size={36} className="mb-3 opacity-70" />
          <p className="text-sm font-medium">Aucun utilisateurs trouvé</p>
        </div>
      )}

      {!loading && users.length > 0 && (
        <div className="space-y-3">
          {users.map((user) => {
            return <SearchCard key={user.id} user={user} />;
          })}
        </div>
      )}
    </Container>
  );
}
