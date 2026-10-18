import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  GitCompare,
  Calendar,
  Layers,
  Sparkles,
  Building,
  RotateCcw,
  LayoutGrid,
  Table as TableIcon,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { searchPatents } from '../services/api';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/common/StatusBadge';
import SimilarityGauge from '../components/common/SimilarityGauge';

export default function PatentSearchPage() {
  const navigate = useNavigate();
  const { setSelectedPatentId } = useApp();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [minSimilarity, setMinSimilarity] = useState('0');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalIndexed, setTotalIndexed] = useState(10);

  const fetchSearchResults = async (q = query, cat = category, st = status, minSim = minSimilarity) => {
    setLoading(true);
    try {
      const res = await searchPatents(q, {
        category: cat,
        status: st,
        minSimilarity: minSim
      });
      setResults(res.results);
      setTotalIndexed(res.totalRecordsInIndex);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchResults('', 'All', 'All', '0');
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults(query, category, status, minSimilarity);
  };

  const handleResetFilters = () => {
    setQuery('');
    setCategory('All');
    setStatus('All');
    setMinSimilarity('0');
    fetchSearchResults('', 'All', 'All', '0');
  };

  const handleViewDetails = (id) => {
    setSelectedPatentId(id);
    navigate(`/patent/${id}`);
  };

  const handleCompareWithMine = (id) => {
    setSelectedPatentId(id);
    navigate('/analysis');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Page Title & Search Bar Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="text-xs font-bold text-ayur-800 uppercase tracking-wider mb-1">
              Prior-Art Repository & Knowledge Base
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-900">
              Search Existing Solutions
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Explore documented Ayurvedic formulations, medical patents, and traditional knowledge cross-references.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
              Demo dataset — records shown for prototype demonstration.
            </span>
          </div>
        </div>

        {/* Search & Filter Form */}
        <form onSubmit={handleSearchSubmit} className="mt-5 space-y-4">
          {/* Main Search Input */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter invention, formulation, treatment area, technology, or keyword (e.g., Gymnema, Curcumin, Bio-enhancer)..."
                className="w-full text-xs sm:text-sm pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-800"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gov-900 hover:bg-gov-800 text-white font-bold text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4 text-amber-300" />}
              <span>Search</span>
            </button>
          </div>

          {/* Faceted Filters Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
            {/* Category Filter */}
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Technology / Category:</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  fetchSearchResults(query, e.target.value, status, minSimilarity);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-gov-800"
              >
                <option value="All">All Categories</option>
                <option value="Ayurveda">Ayurveda</option>
                <option value="Herbal Medicine">Herbal Medicine</option>
                <option value="Medical Formulation">Medical Formulation</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Publication Status:</label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  fetchSearchResults(query, category, e.target.value, minSimilarity);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-gov-800"
              >
                <option value="All">All Statuses</option>
                <option value="Published">Published</option>
                <option value="Granted">Granted</option>
                <option value="Application">Application</option>
              </select>
            </div>

            {/* Min Similarity Filter */}
            <div>
              <label className="block text-slate-600 font-semibold mb-1">
                Min Similarity: <span className="font-bold text-gov-800">{minSimilarity}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="85"
                step="5"
                value={minSimilarity}
                onChange={(e) => {
                  setMinSimilarity(e.target.value);
                  fetchSearchResults(query, category, status, e.target.value);
                }}
                className="w-full accent-gov-800 cursor-pointer"
              />
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Results Header & Layout Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="text-slate-600">
          Showing <strong className="text-gov-900">{results.length}</strong> matching records out of{' '}
          <strong>{totalIndexed}</strong> indexed prototype patents.
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Layout:</span>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded border ${
              viewMode === 'grid'
                ? 'bg-gov-900 text-white border-gov-900'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
            }`}
            title="Card View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded border ${
              viewMode === 'table'
                ? 'bg-gov-900 text-white border-gov-900'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
            }`}
            title="Table View"
          >
            <TableIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-xs">
          <Loader2 className="w-8 h-8 animate-spin text-gov-800 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-gov-900">Retrieving Semantic Embeddings...</h3>
          <p className="text-xs text-slate-500 mt-1">
            Comparing botanical terms and claim matrices against FAISS prototype corpus.
          </p>
        </div>
      )}

      {/* Zero Results State */}
      {!loading && results.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-xs">
          <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Matching Patent Records Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Try adjusting your search keywords, lowering the similarity filter threshold, or clearing the category filter.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 bg-gov-900 text-white rounded-lg text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Grid View */}
      {!loading && viewMode === 'grid' && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {results.map((patent) => (
            <div
              key={patent.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-gov-600 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Card Top Strip */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-gov-800 bg-gov-50 px-2 py-0.5 rounded border border-gov-200">
                    {patent.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-slate-500">{patent.category}</span>
                    <StatusBadge status={patent.status} size="sm" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-gov-950 leading-snug line-clamp-2 hover:text-gov-700">
                  {patent.title}
                </h3>

                {/* Meta details */}
                <div className="text-xs text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{patent.applicant}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      Filing: {patent.filingDate}
                    </span>
                    <span>•</span>
                    <span>Pub: {patent.publicationDate}</span>
                  </div>
                </div>

                {/* Similarity Bar */}
                <div className="pt-1">
                  <SimilarityGauge percentage={patent.similarity} label="Prior-Art Overlap" />
                </div>

                {/* Abstract Preview */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
                  {patent.abstract}
                </p>

                {/* Keywords Chips */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {patent.keywords.slice(0, 4).map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium"
                    >
                      {kw}
                    </span>
                  ))}
                  {patent.keywords.length > 4 && (
                    <span className="text-[10px] text-slate-400 px-1 py-0.5">
                      +{patent.keywords.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleViewDetails(patent.id)}
                  className="flex-1 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-gov-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => handleCompareWithMine(patent.id)}
                  className="flex-1 py-2 px-3 rounded-lg bg-gov-900 hover:bg-gov-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <GitCompare className="w-3.5 h-3.5 text-amber-300" />
                  <span>Compare With Mine</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {!loading && viewMode === 'table' && results.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-gov-900 text-white uppercase text-[11px] tracking-wider font-semibold">
                <tr>
                  <th className="p-3.5">ID</th>
                  <th className="p-3.5">Title & Abstract</th>
                  <th className="p-3.5">Applicant</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Similarity</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {results.map((patent) => (
                  <tr key={patent.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-gov-800 whitespace-nowrap align-top">
                      {patent.id}
                    </td>
                    <td className="p-3.5 max-w-md align-top">
                      <div className="font-bold text-gov-950 mb-1 leading-snug">{patent.title}</div>
                      <p className="text-slate-500 text-[11px] line-clamp-2">{patent.abstract}</p>
                    </td>
                    <td className="p-3.5 align-top whitespace-nowrap">
                      <div className="font-medium text-slate-800">{patent.applicant}</div>
                      <div className="text-[10px] text-slate-400">Filing: {patent.filingDate}</div>
                    </td>
                    <td className="p-3.5 align-top whitespace-nowrap">
                      <span className="font-medium text-slate-700">{patent.category}</span>
                    </td>
                    <td className="p-3.5 align-top whitespace-nowrap">
                      <StatusBadge status={patent.status} size="sm" />
                    </td>
                    <td className="p-3.5 align-top w-36">
                      <SimilarityGauge percentage={patent.similarity} label="Overlap" />
                    </td>
                    <td className="p-3.5 align-top text-right whitespace-nowrap space-x-1">
                      <button
                        onClick={() => handleViewDetails(patent.id)}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-gov-900 rounded font-semibold text-xs transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleCompareWithMine(patent.id)}
                        className="px-2.5 py-1.5 bg-gov-900 hover:bg-gov-800 text-white rounded font-semibold text-xs transition-colors"
                      >
                        Compare
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
