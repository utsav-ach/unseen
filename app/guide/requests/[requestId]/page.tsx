'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Users, DollarSign, Clock, CheckCircle, XCircle, Mail, Phone, Utensils, Heart, ArrowLeft } from 'lucide-react';
import { touristRequests, type TouristRequest } from '@/data/tourists';
import RichTextEditor from '@/components/RichTextEditor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RequestDetailsPage({ params }: { params: Promise<{ requestId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [guideRemarks, setGuideRemarks] = useState('');
  const [prepaymentAmount, setPrepaymentAmount] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);

  // Find the request
  const request = touristRequests.find(req => req.id === resolvedParams.requestId);

  if (!request) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-cream pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-ink mb-4">Request Not Found</h1>
            <button
              onClick={() => router.push('/guide/requests')}
              className="bg-sage text-white px-6 py-3 rounded-lg font-semibold hover:bg-sage/90 transition-colors"
            >
              Back to Requests
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Calculate maximum prepayment (50% of total cost)
  const maxPrepayment = 0.5 * (request.duration * request.groupSize * request.pricePerDay);

  // Set initial remarks and prepayment if they exist
  if (request.guideRemarks && !guideRemarks) {
    setGuideRemarks(request.guideRemarks);
  }
  if (request.prepaymentAmount && prepaymentAmount === 0) {
    setPrepaymentAmount(request.prepaymentAmount);
  }

  const handleSubmitResponse = (action: 'approve' | 'reject') => {
    console.log(`${action === 'approve' ? 'Approving' : 'Rejecting'} request:`, request.id, 'with remarks:', guideRemarks, 'prepayment:', prepaymentAmount);
    setActionType(action);
    setShowSuccess(true);
    setTimeout(() => {
      router.push('/guide/requests');
    }, 2000);
  };

  const handlePrepaymentChange = (value: number) => {
    if (value <= maxPrepayment && value >= 0) {
      setPrepaymentAmount(value);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        {/* Hero Section with Tourist Info */}
        <section className="relative py-6 bg-white/80 backdrop-blur-sm border-b border-border">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <button
              onClick={() => router.push('/guide/requests')}
              className="flex items-center gap-2 text-warmGray hover:text-ink transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Requests</span>
            </button>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              {/* Tourist Avatar */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-border">
                  <img
                    src={request.touristAvatar}
                    alt={request.touristName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Tourist Details */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-ink mb-1">
                  {request.touristName}
                </h1>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-sm text-inkSoft">
                    <Mail className="w-4 h-4 text-sage" />
                    <span>{request.email}</span>
                  </div>
                  <span className="hidden md:inline text-warmGray">•</span>
                  <div className="flex items-center gap-1.5 text-sm text-inkSoft">
                    <Phone className="w-4 h-4 text-sage" />
                    <span>{request.phone}</span>
                  </div>
                </div>

                <p className="text-inkSoft text-sm leading-relaxed mb-3 max-w-2xl">
                  Request submitted on {formatDate(request.submittedAt)}
                </p>

                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                    request.status === 'pending' ? 'bg-terracotta/10 text-terracotta border border-terracotta/20' :
                    request.status === 'approved' ? 'bg-sage/20 text-sage border border-sage/30' :
                    'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {request.status === 'pending' && <Clock className="w-3 h-3" />}
                    {request.status === 'approved' && <CheckCircle className="w-3 h-3" />}
                    {request.status === 'rejected' && <XCircle className="w-3 h-3" />}
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                  <span className="px-3 py-1 bg-sage/10 text-sage rounded-full text-xs font-medium">
                    {request.destination}
                  </span>
                  <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-medium">
                    {request.duration} days
                  </span>
                  <span className="px-3 py-1 bg-terracotta/10 text-terracotta rounded-full text-xs font-medium">
                    {request.groupSize} people
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2 space-y-6">
                {/* User Information */}
                <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                  <h2 className="font-heading text-xl font-bold text-sage mb-6 pb-4 border-b border-border">
                    User Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-warmGray mb-1 uppercase tracking-wide font-semibold">Full Name</p>
                        <p className="font-semibold text-ink">{request.touristName}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-warmGray mb-1 uppercase tracking-wide font-semibold">Email Address</p>
                        <p className="font-semibold text-ink break-all">{request.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-warmGray mb-1 uppercase tracking-wide font-semibold">Phone Number</p>
                        <p className="font-semibold text-ink">{request.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-warmGray mb-1 uppercase tracking-wide font-semibold">Submitted On</p>
                        <p className="font-semibold text-ink">{formatDate(request.submittedAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trek Details */}
                <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                  <h2 className="font-heading text-xl font-bold text-sage mb-6 pb-4 border-b border-border">
                    Trek Details
                  </h2>
                  <div className="space-y-6">
                    {/* Destination & Route */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-warmGray mb-2 uppercase tracking-wide font-semibold">Destination</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-sage" />
                          <p className="font-semibold text-ink">{request.destination}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-warmGray mb-2 uppercase tracking-wide font-semibold">Route</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-sage" />
                          <p className="font-semibold text-ink">{request.route}</p>
                        </div>
                      </div>
                    </div>

                    {/* Dates & Duration */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-xs text-warmGray mb-2 uppercase tracking-wide font-semibold">Start Date</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-sage" />
                          <p className="font-semibold text-ink">{formatDate(request.startDate)}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-warmGray mb-2 uppercase tracking-wide font-semibold">End Date</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-sage" />
                          <p className="font-semibold text-ink">{formatDate(request.endDate)}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-warmGray mb-2 uppercase tracking-wide font-semibold">Duration</p>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-sage" />
                          <p className="font-semibold text-ink">{request.duration} days</p>
                        </div>
                      </div>
                    </div>

                    {/* Group & Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-warmGray mb-2 uppercase tracking-wide font-semibold">Group Size</p>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-sage" />
                          <p className="font-semibold text-ink">{request.groupSize} {request.groupSize === 1 ? 'person' : 'people'}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-warmGray mb-2 uppercase tracking-wide font-semibold">Budget Range</p>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-sage" />
                          <p className="font-semibold text-ink">{request.budget}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                  <h2 className="font-heading text-xl font-bold text-sage mb-6 pb-4 border-b border-border">
                    Preferences
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-warmGray mb-2 uppercase tracking-wide font-semibold">Experience Level</p>
                      <p className="font-medium text-ink">{request.experience || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-warmGray mb-2 uppercase tracking-wide font-semibold">Accommodation Preference</p>
                      <p className="font-medium text-ink">{request.accommodation || 'Not specified'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs text-warmGray mb-2 uppercase tracking-wide font-semibold">Transportation</p>
                      <p className="font-medium text-ink">{request.transportation || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Remarks */}
                <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                  <h2 className="font-heading text-xl font-bold text-sage mb-6 pb-4 border-b border-border">
                    Additional Remarks
                  </h2>
                  <div className="bg-cream/50 rounded-xl p-6 border border-border">
                    {request.specialRequirements ? (
                      <p className="text-ink leading-relaxed whitespace-pre-wrap">
                        {request.specialRequirements}
                      </p>
                    ) : (
                      <p className="text-warmGray italic">No additional remarks provided</p>
                    )}
                  </div>
                </div>

                {/* Health & Dietary */}
                <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                  <h2 className="font-heading text-xl font-bold text-sage mb-6 pb-4 border-b border-border">
                    Health & Dietary Information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-terracotta/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Utensils className="w-5 h-5 text-terracotta" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-warmGray mb-2 uppercase tracking-wide font-semibold">Dietary Restrictions</p>
                        <p className="font-medium text-ink">
                          {request.dietaryRestrictions || 'None specified'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 pt-4 border-t border-border">
                      <div className="w-10 h-10 bg-terracotta/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-terracotta" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-warmGray mb-2 uppercase tracking-wide font-semibold">Medical Conditions</p>
                        <p className="font-medium text-ink">
                          {request.medicalConditions || 'None specified'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                  <h2 className="font-heading text-xl font-bold text-sage mb-6 pb-4 border-b border-border">
                    Emergency Contact
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs text-warmGray mb-2 uppercase tracking-wide font-semibold">Contact Name</p>
                      <p className="font-semibold text-ink">{request.emergencyContact.name || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-warmGray mb-2 uppercase tracking-wide font-semibold">Phone Number</p>
                      <p className="font-semibold text-ink">{request.emergencyContact.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-warmGray mb-2 uppercase tracking-wide font-semibold">Relationship</p>
                      <p className="font-semibold text-ink">{request.emergencyContact.relationship || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - 1 column */}
              <div className="space-y-6">
                {/* Guide Remarks */}
                <div className="bg-white rounded-2xl shadow-sm border border-border p-6 sticky top-24">
                  <h2 className="font-heading text-xl font-bold text-sage mb-6 pb-4 border-b border-border">
                    Guide Remarks
                  </h2>
                  
                  {request.status !== 'pending' && request.guideRemarks ? (
                    <div className="mb-6">
                      <div className="bg-cream rounded-xl p-4 border border-border">
                        <p className="text-xs text-warmGray mb-2 font-semibold">Your Remarks:</p>
                        <div 
                          className="text-sm text-ink prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: request.guideRemarks }}
                        />
                      </div>
                      {request.prepaymentAmount && (
                        <div className="mt-4 bg-sage/10 rounded-xl p-4 border border-sage/20">
                          <p className="text-xs text-sage mb-1 font-semibold">Prepayment Amount:</p>
                          <p className="text-2xl font-bold text-sage">${request.prepaymentAmount.toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-warmGray mb-3">
                        Write your remarks, preparation notes, or special instructions for the tourist.
                      </p>
                      <div className="mb-6">
                        <RichTextEditor
                          value={guideRemarks}
                          onChange={setGuideRemarks}
                          placeholder="Write your remarks, preparation notes, or special instructions..."
                          minHeight="250px"
                        />
                      </div>

                      {/* Prepayment Amount Input */}
                      <div className="mb-6">
                        <label className="block text-sm font-bold text-ink mb-2">
                          Prepayment Amount
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warmGray font-semibold">
                            $
                          </span>
                          <input
                            type="number"
                            min="0"
                            max={maxPrepayment}
                            value={prepaymentAmount}
                            onChange={(e) => handlePrepaymentChange(Number(e.target.value))}
                            placeholder="0"
                            className="w-full pl-8 pr-4 py-3 bg-cream border-2 border-border rounded-lg focus:border-sage focus:ring-4 focus:ring-sage/10 focus:outline-none transition-all text-ink font-semibold"
                          />
                        </div>
                        <p className="text-xs text-warmGray mt-2">
                          Maximum allowed: <span className="font-semibold text-sage">${maxPrepayment.toLocaleString()}</span>
                        </p>
                        <p className="text-xs text-warmGray mt-1">
                          (50% of total: {request.duration} days × {request.groupSize} people × ${request.pricePerDay}/day)
                        </p>
                      </div>

                      {/* Action Buttons */}
                      {request.status === 'pending' && (
                        <div className="space-y-3">
                          <button
                            onClick={() => handleSubmitResponse('approve')}
                            className="w-full bg-sage text-white py-3.5 px-6 rounded-lg hover:bg-sage/90 transition-all duration-200 font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                          >
                            <CheckCircle className="w-5 h-5" />
                            Approve & Submit Response
                          </button>
                          <button
                            onClick={() => handleSubmitResponse('reject')}
                            className="w-full bg-white text-red-600 border-2 border-red-600 py-3.5 px-6 rounded-lg hover:bg-red-50 transition-all duration-200 font-semibold flex items-center justify-center gap-2 hover:shadow-md"
                          >
                            <XCircle className="w-5 h-5" />
                            Reject & Submit Response
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white border-2 border-sage shadow-2xl rounded-2xl p-8 max-w-md mx-4 animate-scale-up">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-sage" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-ink mb-2">
                    Request {actionType === 'approve' ? 'Approved' : 'Rejected'}!
                  </h3>
                  <p className="text-warmGray">
                    Your response has been saved. Redirecting back to requests...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
