import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Lock, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import type { JournalEntry, InsertJournalEntry } from "@shared/schema";

export default function Journal() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const [isCreating, setIsCreating] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [formData, setFormData] = useState<Partial<InsertJournalEntry>>({
    title: "",
    content: "",
    mood: "peaceful",
    energyLevel: 5,
    phaseId: 4,
  });

  const journalPrompts = [
    {
      category: "Self-Compassion",
      prompts: [
        "What would I say to comfort a friend going through this same situation?",
        "How can I show myself kindness today?",
        "What does my inner critic sound like, and how can I respond with compassion?"
      ]
    },
    {
      category: "Boundary Practice",
      prompts: [
        "What boundary did I honor today, even if it was small?",
        "When did I feel my energy drain today, and what boundary might have helped?",
        "What would it feel like to say no without guilt?"
      ]
    },
    {
      category: "Trauma Recovery",
      prompts: [
        "What felt safe and secure in my body today?",
        "How did I take care of my nervous system today?",
        "What triggered me today, and how did I respond with self-care?"
      ]
    },
    {
      category: "Growth & Reflection",
      prompts: [
        "What am I learning about myself in this phase?",
        "How have I grown since starting this journey?",
        "What strength am I discovering that I didn't know I had?"
      ]
    }
  ];

  const moodOptions = [
    { value: "overwhelmed", label: "Overwhelmed", emoji: "😰", color: "red" },
    { value: "anxious", label: "Anxious", emoji: "😟", color: "yellow" },
    { value: "sad", label: "Sad", emoji: "😢", color: "blue" },
    { value: "neutral", label: "Neutral", emoji: "😐", color: "gray" },
    { value: "peaceful", label: "Peaceful", emoji: "😌", color: "green" },
    { value: "hopeful", label: "Hopeful", emoji: "🙂", color: "teal" },
    { value: "grateful", label: "Grateful", emoji: "😊", color: "purple" },
    { value: "empowered", label: "Empowered", emoji: "💪", color: "orange" }
  ];

  const { data: entries = [] } = useQuery<JournalEntry[]>({
    queryKey: ['/api/user/journal'],
    enabled: !!user,
  });

  const createEntryMutation = useMutation({
    mutationFn: async (data: InsertJournalEntry) => {
      const response = await apiRequest('POST', '/api/user/journal', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/journal'] });
      setIsCreating(false);
      setFormData({
        title: "",
        content: "",
        mood: "peaceful",
        energyLevel: 5,
        phaseId: 4,
      });
      toast({
        title: "Journal entry saved",
        description: "Your reflection has been safely stored.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save journal entry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateEntryMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertJournalEntry> }) => {
      const response = await apiRequest('PATCH', `/api/user/journal/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/journal'] });
      setEditingEntry(null);
      setFormData({
        title: "",
        content: "",
        mood: "peaceful",
        energyLevel: 5,
        phaseId: 4,
      });
      toast({
        title: "Journal entry updated",
        description: "Your changes have been saved.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update journal entry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteEntryMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/user/journal/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/journal'] });
      toast({
        title: "Journal entry deleted",
        description: "Your entry has been removed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete journal entry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!user) {
      setLocation("/auth");
      return;
    }

    if (!formData.content?.trim()) {
      toast({
        title: "Error",
        description: "Please write something in your journal entry.",
        variant: "destructive",
      });
      return;
    }

    if (editingEntry) {
      updateEntryMutation.mutate({
        id: editingEntry.id,
        data: formData as InsertJournalEntry
      });
    } else {
      createEntryMutation.mutate(formData as InsertJournalEntry);
    }
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setFormData({
      title: entry.title || "",
      content: entry.content,
      mood: entry.mood || "peaceful",
      energyLevel: entry.energyLevel || 5,
      phaseId: entry.phaseId || 4,
    });
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingEntry(null);
    setFormData({
      title: "",
      content: "",
      mood: "peaceful",
      energyLevel: 5,
      phaseId: 4,
    });
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="py-8" >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Safe Space</h1>
          <p className="text-xl phoenix-text-gray">
            A private place for reflection, insights, and healing
          </p>
        </div>

        {/* New Entry Form */}
        {(isCreating || editingEntry) && (
          <Card className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 mb-8">
            <div className="mb-6">
              <Label className="block text-lg font-medium text-gray-900 mb-2">
                {editingEntry ? 'Edit Entry' : 'Today\'s Reflection'}
              </Label>
              <p className="text-sm phoenix-text-gray mb-4">
                How did practicing boundaries feel today? What did you notice about your emotions and responses?
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-gray-900">
                    Title (optional)
                  </Label>
                  <Input
                    id="title"
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Give your entry a title..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="content" className="text-sm font-medium text-gray-900">
                    Your thoughts and feelings
                  </Label>
                  <Textarea
                    id="content"
                    value={formData.content || ""}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Your thoughts and feelings are safe here..."
                    className="mt-1 h-32 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="block text-sm font-medium text-gray-900 mb-2">
                  Energy Level: {formData.energyLevel}/10
                </Label>
                <Slider
                  value={[formData.energyLevel || 5]}
                  onValueChange={(value) => setFormData({ ...formData, energyLevel: value[0] })}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs phoenix-text-gray mt-1">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-900 mb-2">
                  Mood Today
                </Label>
                <Select value={formData.mood || "peaceful"} onValueChange={(value) => setFormData({ ...formData, mood: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hopeful">Hopeful</SelectItem>
                    <SelectItem value="anxious">Anxious</SelectItem>
                    <SelectItem value="peaceful">Peaceful</SelectItem>
                    <SelectItem value="overwhelmed">Overwhelmed</SelectItem>
                    <SelectItem value="empowered">Empowered</SelectItem>
                    <SelectItem value="tired">Tired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm phoenix-text-gray">
                <Lock className="inline mr-1" size={16} />
                Your entries are private and secure
              </span>
              <div className="space-x-3">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={createEntryMutation.isPending || updateEntryMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={createEntryMutation.isPending || updateEntryMutation.isPending}
                  className="px-6 py-2 phoenix-bg-primary hover:phoenix-bg-secondary text-white rounded-lg transition-colors"
                >
                  {createEntryMutation.isPending || updateEntryMutation.isPending ? 'Saving...' : !user ? 'Login to Continue' : 'Save Entry'}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* New Entry Button */}
        {!isCreating && !editingEntry && (
          <div className="text-center mb-8">
            <Button
              onClick={() => setIsCreating(true)}
              className="phoenix-bg-primary hover:phoenix-bg-secondary text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              <Plus className="mr-2" size={20} />
              New Journal Entry
            </Button>
          </div>
        )}

        {/* Recent Entries */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Journal Entries</h2>

          {entries.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="phoenix-text-gray text-lg mb-4">You haven't written any journal entries yet.</p>
              <p className="phoenix-text-gray text-sm">
                Journaling is a powerful tool for self-reflection and healing. Start your first entry today!
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <Card key={entry.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {entry.title || formatDate(entry.createdAt!)}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(entry)}
                            className="phoenix-text-primary hover:phoenix-text-secondary"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteEntryMutation.mutate(entry.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>

                      {entry.title && (
                        <p className="text-sm phoenix-text-gray mb-2">
                          {formatDate(entry.createdAt!)}
                        </p>
                      )}

                      <div className="flex items-center space-x-4 mb-3">
                        {entry.mood && (
                          <span className="text-sm phoenix-text-gray">
                            Mood: <span className="font-medium capitalize">{entry.mood}</span>
                          </span>
                        )}
                        {entry.energyLevel && (
                          <span className="text-sm phoenix-text-gray">
                            Energy: <span className="font-medium">{entry.energyLevel}/10</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm phoenix-text-gray leading-relaxed">
                    {entry.content.length > 200 ? `${entry.content.substring(0, 200)}...` : entry.content}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main >
  );
}
