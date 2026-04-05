'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Users, CheckCircle, XCircle, Eye, Star, Filter } from 'lucide-react';
import { touristRequests, getRequestStats } from '@/data/tourists';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function GuideRequestsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Current guide data - in real app, this would come from auth/session
  // Using first guide from trek-dai data as example
  const currentGuide = {
    id: 'guide-1',
    name: 'Nima Sherpa',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face',
    rating: 4.9,
    reviews: 156,
  };

  const guideRequests = touristRequests.filter(req => req.guideId === currentGuide.id);
  const stats = getRequestStats(currentGuide.id);

  // Filter requests based on active filter
  const filteredRequests = activeFilter === 'all' 
    ? guideRequests 
    : guideRequests.filter(req => req.status === activeFilter);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleApprove = (requestId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Approving request:', requestId);
    // In real app, this would update the backend
  };

  const handleReject = (requestId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Rejecting request:', requestId);
    // In real app, this would update the backend
  };

  const handleViewDetails = (requestId: string) => {
    router.push(`/guide/requests/${requestId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-3 py-1 bg-terracotta/10 text-terracotta rounded-full text-xs font-semibold border border-terracotta/20">
            Pending
          </span>
        );
      case 'approved':
        return (
          <span className="px-3 py-1 bg-sage/20 text-sage rounded-full text-xs font-semibold border border-sage/30">
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold border border-red-200">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        {/* Hero Section with Guide Profile */}
        <section className="relative py-8 bg-white/80 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Guide Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={currentGuide.avatar}
                    alt={currentGuide.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Guide Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-2">
                  {currentGuide.name}
                </h1>
                
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(currentGuide.rating) ? 'fill-gold text-gold' : 'text-warmGray'}`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gold">{currentGuide.rating}</span>
                  <span className="text-sm text-warmGray">({currentGuide.reviews} reviews)</span>
                </div>

                <p className="text-warmGray text-sm md:text-base leading-relaxed max-w-2xl">
                  Manage incoming trek requests from travelers. Review details and approve or reject requests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-6 bg-white border-b border-border sticky top-20 z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <Filter className="w-5 h-5 text-warmGray flex-shrink-0" />
              {[
                { id: 'all', label: 'All Requests', count: stats.total },
                { id: 'pending', label: 'Pending', count: stats.pending },
                { id: 'approved', label: 'Approved', count: stats.approved },
                { id: 'rejected', label: 'Rejected', count: stats.rejected },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                    activeFilter === tab.id
                      ? 'bg-ink text-white shadow-md'
                      : 'bg-white text-inkSoft border-2 border-border hover:border-sage hover:text-ink'
                  }`}
                >
                  {tab.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    activeFilter === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-cream text-warmGray'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Requests Grid Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {/* Requests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl shadow-sm border border-border p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => handleViewDetails(request.id)}
                >
                  {/* Tourist Info */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-cream group-hover:ring-sage transition-all">
                      <img
                        src={request.touristAvatar}
                        alt={request.touristName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg font-bold text-ink mb-1 group-hover:text-sage transition-colors">
                        {request.touristName}
                      </h3>
                      <p className="text-xs text-warmGray">
                        {formatDate(request.submittedAt)}
                      </p>
                    </div>
                  </div>

                  {/* Trek Details */}
                  <div className="mb-5">
                    <h4 className="font-semibold text-ink mb-3 text-base">{request.destination}</h4>
                    
                    <div className="space-y-2.5 text-sm">
                      <div className="flex items-center gap-2 text-warmGray">
                        <MapPin className="w-4 h-4 text-sage flex-shrink-0" />
                        <span className="truncate">{request.route}</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-warmGray">
                          <Calendar className="w-4 h-4 text-sage" />
                          <span>{request.duration} days</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-warmGray">
                          <Users className="w-4 h-4 text-sage" />
                          <span>{request.groupSize} people</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {/* Conditional rendering based on status */}
                    {request.status === 'pending' && (
                      <>
                        {/* Pending: Only View Details */}
                        <button
                          onClick={() => handleViewDetails(request.id)}
                          className="w-full bg-green-600 text-white py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </>
                    )}

                    {request.status === 'approved' && (
                      <>
                        {/* Approved: Approved button + View Details */}
                        <button
                          disabled
                          className="w-full bg-green-100 text-green-700 py-2.5 px-3 rounded-lg text-sm font-semibold cursor-not-allowed flex items-center justify-center gap-2 border border-green-200"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approved
                        </button>
                        <button
                          onClick={() => handleViewDetails(request.id)}
                          className="w-full bg-green-600 text-white py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </>
                    )}

                    {request.status === 'rejected' && (
                      <>
                        {/* Rejected: Rejected button + View Details */}
                        <button
                          disabled
                          className="w-full bg-red-100 text-red-700 py-2.5 px-3 rounded-lg text-sm font-semibold cursor-not-allowed flex items-center justify-center gap-2 border border-red-200"
                        >
                          <XCircle className="w-4 h-4" />
                          Rejected
                        </button>
                        <button
                          onClick={() => handleViewDetails(request.id)}
                          className="w-full bg-green-600 text-white py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredRequests.length === 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-border p-12 text-center">
                <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-sage" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-2">No Requests Found</h3>
                <p className="text-warmGray">
                  {activeFilter === 'all' 
                    ? "You don't have any requests at the moment."
                    : `You don't have any ${activeFilter} requests.`}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
