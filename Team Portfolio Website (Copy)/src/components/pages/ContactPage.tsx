import React, { useState } from 'react';
import { useApp } from '../../lib/AppContext';
import { translations } from '../../lib/translations';
import { teamMembers } from '../../lib/mock-data';
import { Send, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner@2.0.3';

export const ContactPage: React.FC = () => {
  const { language, setCurrentPage, setSelectedProfileId } = useApp();
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    recipient: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would send the form data to a server
    console.log('Form submitted:', formData);
    
    toast.success(language === 'en' ? 'Message sent successfully!' : 'Melding sendt!');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      recipient: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleViewProfile = (id: string) => {
    setSelectedProfileId(id);
    setCurrentPage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="main-content" className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl mb-4">{t.contact.title}</h1>
          <p className="text-lg text-muted-foreground">{t.contact.subtitle}</p>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <h2>Send us a message</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2">
                    {t.contact.name}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2">
                    {t.contact.email}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="recipient" className="block mb-2">
                    {t.contact.recipient}
                  </label>
                  <Select
                    value={formData.recipient}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, recipient: value }))
                    }
                  >
                    <SelectTrigger id="recipient">
                      <SelectValue placeholder={t.contact.recipientPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{t.contact.anyTeamMember}</SelectItem>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name} - {member.role.join(', ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2">
                    {t.contact.message}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={6}
                  />
                </div>

                <div className="space-y-4">
                  <Button type="submit" size="lg" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    {t.contact.send}
                  </Button>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                      {t.contact.responseTime}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t.contact.privacy}
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Team Contacts Section */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl mb-2">{t.contact.teamContactsTitle}</h2>
            <p className="text-muted-foreground">{t.contact.teamContactsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="group hover:shadow-xl hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all cursor-pointer"
                onClick={() => handleViewProfile(member.id)}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="w-20 h-20 ring-4 ring-background group-hover:ring-primary transition-all">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(' ').map((n) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="mb-2">{member.name}</h3>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.role.map((role) => (
                      <Badge key={role} variant="secondary" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground text-center line-clamp-2">
                    {member.bio}
                  </p>

                  <div className="space-y-2 pt-2 border-t">
                    {member.contactInfo.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                        <a
                          href={`mailto:${member.contactInfo.email}`}
                          className="hover:text-primary transition-colors truncate"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {member.contactInfo.email}
                        </a>
                      </div>
                    )}
                    {member.contactInfo.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                        <a
                          href={`tel:${member.contactInfo.phone.replace(/\s/g, '')}`}
                          className="hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {member.contactInfo.phone}
                        </a>
                      </div>
                    )}
                    {member.contactInfo.address && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">
                          {member.contactInfo.address}
                        </span>
                      </div>
                    )}
                  </div>

                  <Button variant="outline" className="w-full mt-4" size="sm">
                    {t.contact.viewProfile}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
