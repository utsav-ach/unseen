"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/backend/backend/services";
import { createClient } from "@/backend/supabase/client";
import {
    Users, UserCheck, MapPin, Calendar, Star, BookOpen, MessageSquare,
    Heart, FileText, Plus, Edit, Trash2, Check, X, Search,
    ChevronLeft, ChevronRight, Eye, RefreshCw, Download, Menu,
    Home, LogOut, Mail, MailOpen
} from "lucide-react";

type TableName = 'profiles' | 'guides' | 'guide_applications' | 'bookings' | 'reviews' | 'stories' | 'story_comments' | 'story_likes' | 'guide_service_areas' | 'contact_messages';

export default function AdminPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeTable, setActiveTable] = useState<TableName>('profiles');
    const [tableData, setTableData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [stats, setStats] = useState<any>({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        checkAdminAccess();
    }, []);

    useEffect(() => {
        if (isAdmin) {
            loadTableData();
            loadStats();
        }
    }, [activeTable, isAdmin]);

    useEffect(() => {
        filterData();
    }, [searchTerm, tableData]);

    const checkAdminAccess = async () => {
        // DEVELOPMENT MODE - Skip auth check
        setIsAdmin(true);
        setLoading(false);
    };

    const loadStats = async () => {
        const statsData: any = {};
        const tables = ['profiles', 'guides', 'bookings', 'reviews', 'stories', 'guide_applications', 'contact_messages'];

        for (const table of tables) {
            const { count } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });
            statsData[table] = count || 0;
        }

        // Count unread messages
        const { count: unreadCount } = await supabase
            .from('contact_messages')
            .select('*', { count: 'exact', head: true })
            .eq('is_read', false);
        statsData['unread_messages'] = unreadCount || 0;

        setStats(statsData);
    };

    const loadTableData = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from(activeTable)
            .select('*')
            .order('created_at', { ascending: false })
            .limit(500);

        if (!error && data) {
            setTableData(data);
            setFilteredData(data);
        }
        setLoading(false);
    };

    const filterData = () => {
        if (!searchTerm) {
            setFilteredData(tableData);
            return;
        }

        const filtered = tableData.filter((item) =>
            Object.values(item).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        const { error } = await supabase
            .from(activeTable)
            .delete()
            .eq('id', id);

        if (!error) {
            loadTableData();
            loadStats();
        } else {
            alert('Error deleting: ' + error.message);
        }
    };

    const handleAdd = () => {
        setFormData({});
        setShowAddModal(true);
    };

    const handleEdit = (item: any) => {
        setSelectedItem(item);
        setFormData(item);
        setShowEditModal(true);
    };

    const handleView = (item: any) => {
        setSelectedItem(item);
        setShowViewModal(true);
    };

    const handleSave = async () => {
        if (showEditModal && selectedItem) {
            const { error } = await supabase
                .from(activeTable)
                .update(formData)
                .eq('id', selectedItem.id);

            if (!error) {
                setShowEditModal(false);
                loadTableData();
            } else {
                alert('Error updating: ' + error.message);
            }
        } else {
            const { error } = await supabase
                .from(activeTable)
                .insert([formData]);

            if (!error) {
                setShowAddModal(false);
                loadTableData();
                loadStats();
            } else {
                alert('Error adding: ' + error.message);
            }
        }
    };

    const handleApproveApplication = async (id: string) => {
        const { error } = await supabase
            .from('guide_applications')
            .update({ status: 'approved' })
            .eq('id', id);

        if (!error) {
            loadTableData();
            alert('Application approved!');
        }
    };

    const handleRejectApplication = async (id: string) => {
        const { error } = await supabase
            .from('guide_applications')
            .update({ status: 'rejected' })
            .eq('id', id);

        if (!error) {
            loadTableData();
            alert('Application rejected!');
        }
    };

    const handleMarkAsRead = async (id: string) => {
        const { error } = await supabase
            .from('contact_messages')
            .update({ is_read: true })
            .eq('id', id);

        if (!error) {
            loadTableData();
            loadStats();
        }
    };

    const handleMarkAsUnread = async (id: string) => {
        const { error } = await supabase
            .from('contact_messages')
            .update({ is_read: false })
            .eq('id', id);

        if (!error) {
            loadTableData();
            loadStats();
        }
    };


    const exportToCSV = () => {
        const headers = Object.keys(filteredData[0] || {});
        const csv = [
            headers.join(','),
            ...filteredData.map(row =>
                headers.map(header => JSON.stringify(row[header] || '')).join(',')
            )
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${activeTable}_${new Date().toISOString()}.csv`;
        a.click();
    };

    const tables = [
        { name: 'profiles' as TableName, icon: Users, label: 'Profiles', color: 'text-blue-500', bgColor: 'bg-blue-50' },
        { name: 'guides' as TableName, icon: UserCheck, label: 'Guides', color: 'text-green-500', bgColor: 'bg-green-50' },
        { name: 'guide_applications' as TableName, icon: FileText, label: 'Applications', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
        { name: 'bookings' as TableName, icon: Calendar, label: 'Bookings', color: 'text-purple-500', bgColor: 'bg-purple-50' },
        { name: 'reviews' as TableName, icon: Star, label: 'Reviews', color: 'text-orange-500', bgColor: 'bg-orange-50' },
        { name: 'stories' as TableName, icon: BookOpen, label: 'Stories', color: 'text-pink-500', bgColor: 'bg-pink-50' },
        { name: 'story_comments' as TableName, icon: MessageSquare, label: 'Comments', color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
        { name: 'story_likes' as TableName, icon: Heart, label: 'Likes', color: 'text-red-500', bgColor: 'bg-red-50' },
        { name: 'guide_service_areas' as TableName, icon: MapPin, label: 'Service Areas', color: 'text-teal-500', bgColor: 'bg-teal-50' },
        { name: 'contact_messages' as TableName, icon: Mail, label: 'Contact Messages', color: 'text-cyan-500', bgColor: 'bg-cyan-50' },
    ];

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    if (loading && !isAdmin) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-warmGray">Loading admin panel...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-cream overflow-hidden">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-ink text-white transition-all duration-300 flex flex-col`}>
                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        {sidebarOpen && (
                            <h1 className="text-xl font-heading font-bold">Admin Panel</h1>
                        )}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-2">
                        {/* Dashboard */}
                        <button
                            onClick={() => setActiveTable('profiles')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTable === 'profiles' ? 'bg-gold text-ink' : 'hover:bg-white/10'
                                }`}
                        >
                            <Home className="w-5 h-5 flex-shrink-0" />
                            {sidebarOpen && <span className="font-semibold">Dashboard</span>}
                        </button>

                        {/* Divider */}
                        {sidebarOpen && (
                            <div className="px-4 py-2">
                                <p className="text-xs text-white/50 uppercase tracking-wider">Tables</p>
                            </div>
                        )}

                        {/* Table Links */}
                        {tables.map((table) => {
                            const Icon = table.icon;
                            return (
                                <button
                                    key={table.name}
                                    onClick={() => {
                                        setActiveTable(table.name);
                                        setSearchTerm("");
                                        setCurrentPage(1);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTable === table.name ? 'bg-gold text-ink' : 'hover:bg-white/10'
                                        }`}
                                    title={!sidebarOpen ? table.label : ''}
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    {sidebarOpen && <span className="font-medium">{table.label}</span>}
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() => router.push('/')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && <span className="font-medium">Exit Admin</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Top Bar */}
                <header className="bg-white border-b border-border p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-heading font-bold text-ink capitalize">
                                {activeTable.replace(/_/g, ' ')}
                            </h2>
                            <p className="text-warmGray mt-1">
                                Manage {activeTable.replace(/_/g, ' ')} data
                            </p>
                        </div>
                        <button
                            onClick={loadTableData}
                            className="flex items-center gap-2 px-4 py-2 bg-cream hover:bg-border border border-border rounded-lg transition-all"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span className="font-semibold">Refresh</span>
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <Users className="w-5 h-5 text-blue-500" />
                                </div>
                                <span className="text-xs text-warmGray font-semibold">Profiles</span>
                            </div>
                            <p className="text-2xl font-bold text-ink">{stats.profiles || 0}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <UserCheck className="w-5 h-5 text-green-500" />
                                </div>
                                <span className="text-xs text-warmGray font-semibold">Guides</span>
                            </div>
                            <p className="text-2xl font-bold text-ink">{stats.guides || 0}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-yellow-50 rounded-lg">
                                    <FileText className="w-5 h-5 text-yellow-600" />
                                </div>
                                <span className="text-xs text-warmGray font-semibold">Applications</span>
                            </div>
                            <p className="text-2xl font-bold text-ink">{stats.guide_applications || 0}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-50 rounded-lg">
                                    <Calendar className="w-5 h-5 text-purple-500" />
                                </div>
                                <span className="text-xs text-warmGray font-semibold">Bookings</span>
                            </div>
                            <p className="text-2xl font-bold text-ink">{stats.bookings || 0}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-orange-50 rounded-lg">
                                    <Star className="w-5 h-5 text-orange-500" />
                                </div>
                                <span className="text-xs text-warmGray font-semibold">Reviews</span>
                            </div>
                            <p className="text-2xl font-bold text-ink">{stats.reviews || 0}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-pink-50 rounded-lg">
                                    <BookOpen className="w-5 h-5 text-pink-500" />
                                </div>
                                <span className="text-xs text-warmGray font-semibold">Stories</span>
                            </div>
                            <p className="text-2xl font-bold text-ink">{stats.stories || 0}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-cyan-50 rounded-lg">
                                    <Mail className="w-5 h-5 text-cyan-500" />
                                </div>
                                <span className="text-xs text-warmGray font-semibold">Unread Messages</span>
                            </div>
                            <p className="text-2xl font-bold text-ink">{stats.unread_messages || 0}</p>
                        </div>
                    </div>

                    {/* Table Content */}
                    <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
                        {/* Toolbar */}
                        <div className="p-6 border-b border-border">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="text-sm text-warmGray">
                                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} results
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    {/* Search */}
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warmGray" />
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Search..."
                                            className="pl-10 pr-4 py-2 border-2 border-border rounded-lg bg-white text-ink outline-none focus:border-gold w-64"
                                        />
                                    </div>
                                    {/* Export */}
                                    <button
                                        onClick={exportToCSV}
                                        disabled={filteredData.length === 0}
                                        className="flex items-center gap-2 px-4 py-2 bg-cream hover:bg-border text-ink rounded-lg font-semibold transition-all disabled:opacity-50"
                                    >
                                        <Download className="w-4 h-4" />
                                        Export
                                    </button>
                                    {/* Add New */}
                                    <button
                                        onClick={handleAdd}
                                        className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-goldLight text-ink rounded-lg font-semibold transition-all"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add New
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            {loading ? (
                                <div className="p-12 text-center">
                                    <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
                                </div>
                            ) : currentItems.length === 0 ? (
                                <div className="p-12 text-center text-warmGray">
                                    {searchTerm ? 'No results found' : 'No data found'}
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead className="bg-cream">
                                        <tr>
                                            {Object.keys(currentItems[0]).slice(0, 5).map((key) => (
                                                <th key={key} className="px-6 py-3 text-left text-xs font-semibold text-warmGray uppercase tracking-wider">
                                                    {key.replace(/_/g, ' ')}
                                                </th>
                                            ))}
                                            <th className="px-6 py-3 text-right text-xs font-semibold text-warmGray uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {currentItems.map((item) => (
                                            <tr key={item.id} className="hover:bg-cream/50 transition-colors">
                                                {Object.entries(item).slice(0, 5).map(([key, value]: [string, any]) => (
                                                    <td key={key} className="px-6 py-4 text-sm text-ink">
                                                        {typeof value === 'boolean' ? (
                                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                                {value ? 'Yes' : 'No'}
                                                            </span>
                                                        ) : typeof value === 'object' && value !== null ? (
                                                            <span className="text-xs text-warmGray">Object</span>
                                                        ) : (
                                                            <span className="truncate block max-w-xs">
                                                                {String(value || '-').substring(0, 50)}
                                                            </span>
                                                        )}
                                                    </td>
                                                ))}
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {activeTable === 'guide_applications' && item.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleApproveApplication(item.id)}
                                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                                    title="Approve"
                                                                >
                                                                    <Check className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleRejectApplication(item.id)}
                                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                    title="Reject"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </button>
                                                            </>
                                                        )}
                                                        {activeTable === 'contact_messages' && (
                                                            <>
                                                                {item.is_read ? (
                                                                    <button
                                                                        onClick={() => handleMarkAsUnread(item.id)}
                                                                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                                                        title="Mark as Unread"
                                                                    >
                                                                        <Mail className="w-4 h-4" />
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => handleMarkAsRead(item.id)}
                                                                        className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                                                                        title="Mark as Read"
                                                                    >
                                                                        <Mail className="w-4 h-4 fill-current" />
                                                                    </button>
                                                                )}
                                                            </>
                                                        )}
                                                        <button
                                                            onClick={() => handleView(item)}
                                                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                            title="View"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(item)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(item.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="p-6 border-t border-border flex items-center justify-between">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-2 px-4 py-2 bg-cream hover:bg-border text-ink rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous
                                </button>
                                <div className="flex items-center gap-2">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`w-10 h-10 rounded-lg font-semibold transition-all ${currentPage === pageNum
                                                    ? 'bg-gold text-ink'
                                                    : 'bg-cream hover:bg-border text-warmGray'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-2 px-4 py-2 bg-cream hover:bg-border text-ink rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* View Modal */}
            {showViewModal && selectedItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-white">
                            <h3 className="text-2xl font-heading font-bold text-ink">
                                View Details
                            </h3>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="p-2 hover:bg-cream rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {Object.entries(selectedItem).map(([key, value]: [string, any]) => (
                                    <div key={key} className="border-b border-border pb-4 last:border-0">
                                        <label className="block text-sm font-semibold text-warmGray mb-2 capitalize">
                                            {key.replace(/_/g, ' ')}
                                        </label>
                                        <div className="text-ink">
                                            {typeof value === 'boolean' ? (
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {value ? 'Yes' : 'No'}
                                                </span>
                                            ) : typeof value === 'object' && value !== null ? (
                                                <pre className="bg-cream p-4 rounded-lg overflow-auto text-sm">
                                                    {JSON.stringify(value, null, 2)}
                                                </pre>
                                            ) : (
                                                <p className="bg-cream p-3 rounded-lg">{String(value || '-')}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 border-t border-border flex gap-3 justify-end sticky bottom-0 bg-white">
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="px-6 py-2 bg-cream hover:bg-border text-ink rounded-lg font-semibold transition-all"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    setShowViewModal(false);
                                    handleEdit(selectedItem);
                                }}
                                className="px-6 py-2 bg-gold hover:bg-goldLight text-ink rounded-lg font-semibold transition-all"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}
            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-white">
                            <h3 className="text-2xl font-heading font-bold text-ink">
                                {showEditModal ? 'Edit' : 'Add'} {activeTable.replace(/_/g, ' ')}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setShowEditModal(false);
                                }}
                                className="p-2 hover:bg-cream rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {tableData.length > 0 && Object.keys(tableData[0])
                                    .filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at')
                                    .map((key) => (
                                        <div key={key}>
                                            <label className="block text-sm font-semibold text-ink mb-2 capitalize">
                                                {key.replace(/_/g, ' ')}
                                            </label>
                                            {key.includes('description') || key.includes('bio') || key.includes('comment') || key.includes('content') ? (
                                                <textarea
                                                    value={formData[key] || ''}
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    className="w-full px-4 py-2 border-2 border-border rounded-xl bg-white text-ink outline-none focus:border-gold min-h-[100px]"
                                                    placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                                                />
                                            ) : key.includes('is_') || key === 'onboarding_completed' || key === 'is_available' || key === 'is_archived' ? (
                                                <select
                                                    value={formData[key] === true ? 'true' : formData[key] === false ? 'false' : ''}
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value === 'true' })}
                                                    className="w-full px-4 py-2 border-2 border-border rounded-xl bg-white text-ink outline-none focus:border-gold"
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="true">Yes</option>
                                                    <option value="false">No</option>
                                                </select>
                                            ) : key === 'role' ? (
                                                <select
                                                    value={formData[key] || ''}
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    className="w-full px-4 py-2 border-2 border-border rounded-xl bg-white text-ink outline-none focus:border-gold"
                                                >
                                                    <option value="">Select role...</option>
                                                    <option value="tourist">Tourist</option>
                                                    <option value="guide">Guide</option>
                                                    <option value="hotel_owner">Hotel Owner</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            ) : key === 'status' && activeTable === 'bookings' ? (
                                                <select
                                                    value={formData[key] || ''}
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    className="w-full px-4 py-2 border-2 border-border rounded-xl bg-white text-ink outline-none focus:border-gold"
                                                >
                                                    <option value="">Select status...</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                    <option value="reported">Reported</option>
                                                </select>
                                            ) : key === 'status' && activeTable === 'guide_applications' ? (
                                                <select
                                                    value={formData[key] || ''}
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    className="w-full px-4 py-2 border-2 border-border rounded-xl bg-white text-ink outline-none focus:border-gold"
                                                >
                                                    <option value="">Select status...</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="approved">Approved</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={formData[key] || ''}
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    className="w-full px-4 py-2 border-2 border-border rounded-xl bg-white text-ink outline-none focus:border-gold"
                                                    placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                                                />
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="p-6 border-t border-border flex gap-3 justify-end sticky bottom-0 bg-white">
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setShowEditModal(false);
                                }}
                                className="px-6 py-2 bg-cream hover:bg-border text-ink rounded-lg font-semibold transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-gold hover:bg-goldLight text-ink rounded-lg font-semibold transition-all"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
