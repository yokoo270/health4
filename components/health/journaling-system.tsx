'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, 
  Lock, 
  Plus, 
  Calendar, 
  Heart, 
  Lightbulb,
  Target,
  Smile,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Key,
  CheckCircle,
  Brain,
  TrendingUp
} from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  type: JournalType;
  date: string;
  mood?: number;
  tags?: string[];
  encrypted: boolean;
}

type JournalType = 'gratitude' | 'reflection' | 'creative' | 'goals' | 'emotional';

interface JournalType {
  id: JournalType;
  name: string;
  description: string;
  icon: string;
  prompts: string[];
  benefits: string[];
  color: string;
}

const journalTypes: JournalType[] = [
  {
    id: 'gratitude',
    name: 'Gratitud',
    description: 'Enfócate en lo positivo y desarrolla una mentalidad agradecida',
    icon: '🙏',
    prompts: [
      '¿Por qué 3 cosas estoy agradecido hoy?',
      '¿Qué persona me hizo sonreír hoy y por qué?',
      '¿Qué experiencia simple me trajo alegría?',
      '¿Qué logro, por pequeño que sea, celebro hoy?',
      '¿Qué desafío de hoy me ayudó a crecer?'
    ],
    benefits: [
      'Mejora el estado de ánimo',
      'Reduce ansiedad y depresión',
      'Aumenta la satisfacción vital',
      'Mejora las relaciones sociales',
      'Desarrolla resiliencia'
    ],
    color: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  },
  {
    id: 'reflection',
    name: 'Reflexión Personal',
    description: 'Analiza tu día, decisiones y crecimiento personal',
    icon: '🤔',
    prompts: [
      '¿Qué aprendí sobre mí mismo hoy?',
      '¿Qué decisión tomé hoy y por qué?',
      '¿Cómo manejé los desafíos de hoy?',
      '¿En qué aspectos puedo mejorar mañana?',
      '¿Qué patrón he notado en mi comportamiento esta semana?'
    ],
    benefits: [
      'Aumenta autoconciencia',
      'Mejora toma de decisiones',
      'Identifica patrones de comportamiento',
      'Facilita crecimiento personal',
      'Desarrolla pensamiento crítico'
    ],
    color: 'bg-blue-50 border-blue-200 text-blue-800'
  },
  {
    id: 'creative',
    name: 'Creativo',
    description: 'Libera tu creatividad sin juicios ni limitaciones',
    icon: '🎨',
    prompts: [
      'Si pudiera hacer cualquier cosa hoy, ¿qué sería?',
      'Describe un mundo ideal usando todos tus sentidos',
      'Escribe una historia de 100 palabras sobre tu día',
      'Si fueras un color, ¿cuál serías y por qué?',
      'Inventa una solución creativa a un problema cotidiano'
    ],
    benefits: [
      'Estimula la creatividad',
      'Reduce bloqueos mentales',
      'Mejora expresión personal',
      'Desarrolla pensamiento divergente',
      'Alivia el estrés'
    ],
    color: 'bg-purple-50 border-purple-200 text-purple-800'
  },
  {
    id: 'goals',
    name: 'Metas y Productividad',
    description: 'Planifica, organiza y hace seguimiento a tus objetivos',
    icon: '🎯',
    prompts: [
      '¿Cuáles son mis 3 prioridades para mañana?',
      '¿Qué progreso hice hacia mis objetivos esta semana?',
      '¿Qué obstáculo me está frenando y cómo lo supero?',
      '¿Qué hábito nuevo quiero desarrollar?',
      '¿Cómo voy a celebrar mis logros recientes?'
    ],
    benefits: [
      'Clarifica objetivos',
      'Aumenta productividad',
      'Mejora organización',
      'Mantiene motivación',
      'Facilita seguimiento de progreso'
    ],
    color: 'bg-green-50 border-green-200 text-green-800'
  },
  {
    id: 'emotional',
    name: 'Emocional (Desahogo)',
    description: 'Procesa y libera emociones de forma saludable',
    icon: '💭',
    prompts: [
      '¿Cómo me siento realmente en este momento?',
      '¿Qué emociones he estado evitando?',
      '¿Qué necesito para sentirme mejor?',
      '¿Qué me está generando estrés o ansiedad?',
      '¿Qué mensaje me daría a mí mismo si fuera mi mejor amigo?'
    ],
    benefits: [
      'Procesa emociones difíciles',
      'Reduce estrés y ansiedad',
      'Mejora regulación emocional',
      'Facilita autocompasión',
      'Previene acumulación emocional'
    ],
    color: 'bg-red-50 border-red-200 text-red-800'
  }
];

export default function JournalingSystem() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [selectedType, setSelectedType] = useState<JournalType>('gratitude');
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 5,
    tags: '',
    encrypted: false
  });
  const [secureMode, setSecureMode] = useState(false);
  const [password, setPassword] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [showPasswordSetup, setShowPasswordSetup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    // Load entries from localStorage
    const saved = localStorage.getItem('journal-entries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }

    // Check if password exists
    const savedPassword = localStorage.getItem('journal-password');
    if (savedPassword) {
      setPassword(savedPassword);
    }
  }, []);

  const saveEntries = (newEntries: JournalEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('journal-entries', JSON.stringify(newEntries));
  };

  const createEntry = () => {
    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: newEntry.title || `${journalTypes.find(t => t.id === selectedType)?.name} - ${new Date().toLocaleDateString()}`,
      content: newEntry.content,
      type: selectedType,
      date: new Date().toISOString(),
      mood: newEntry.mood,
      tags: newEntry.tags ? newEntry.tags.split(',').map(t => t.trim()) : [],
      encrypted: newEntry.encrypted
    };

    if (entry.encrypted && !password) {
      setShowPasswordSetup(true);
      return;
    }

    const newEntries = [entry, ...entries];
    saveEntries(newEntries);
    
    setNewEntry({ title: '', content: '', mood: 5, tags: '', encrypted: false });
    setShowNewEntry(false);
  };

  const deleteEntry = (id: string) => {
    const newEntries = entries.filter(entry => entry.id !== id);
    saveEntries(newEntries);
    setSelectedEntry(null);
  };

  const setupPassword = () => {
    if (enteredPassword.length < 4) {
      alert('La contraseña debe tener al menos 4 caracteres');
      return;
    }
    
    setPassword(enteredPassword);
    localStorage.setItem('journal-password', enteredPassword);
    setShowPasswordSetup(false);
    setEnteredPassword('');
    
    // Create the encrypted entry
    createEntry();
  };

  const toggleSecureMode = () => {
    if (!secureMode && password) {
      const inputPassword = prompt('Ingresa tu contraseña para acceder al modo seguro:');
      if (inputPassword === password) {
        setSecureMode(true);
      } else {
        alert('Contraseña incorrecta');
      }
    } else {
      setSecureMode(!secureMode);
    }
  };

  const filteredEntries = entries.filter(entry => {
    if (entry.encrypted && !secureMode) return false;
    if (searchTerm) {
      return entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
             entry.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return true;
  });

  const getTypeStats = () => {
    const stats = journalTypes.map(type => ({
      ...type,
      count: entries.filter(entry => entry.type === type.id).length
    }));
    return stats;
  };

  const getRecentMoodAverage = () => {
    const recentEntries = entries
      .filter(entry => entry.mood !== undefined)
      .slice(0, 7);
    
    if (recentEntries.length === 0) return 0;
    
    const average = recentEntries.reduce((sum, entry) => sum + (entry.mood || 0), 0) / recentEntries.length;
    return Math.round(average * 10) / 10;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <BookOpen className="w-8 h-8 text-blue-500" />
          Journaling
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Reflexiona, organiza tus pensamientos y desarrolla claridad mental a través de la escritura
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{entries.length}</div>
            <div className="text-sm text-muted-foreground">Entradas totales</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{getRecentMoodAverage()}/10</div>
            <div className="text-sm text-muted-foreground">Humor promedio</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {entries.filter(e => e.date.split('T')[0] === new Date().toISOString().split('T')[0]).length}
            </div>
            <div className="text-sm text-muted-foreground">Entradas hoy</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.max(...getTypeStats().map(s => s.count)) > 0 ? 
                getTypeStats().find(s => s.count === Math.max(...getTypeStats().map(st => st.count)))?.name || '-' : '-'}
            </div>
            <div className="text-sm text-muted-foreground">Tipo favorito</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="write" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="write">Escribir</TabsTrigger>
          <TabsTrigger value="entries">Mis Entradas</TabsTrigger>
          <TabsTrigger value="types">Tipos</TabsTrigger>
          <TabsTrigger value="education">Educación</TabsTrigger>
        </TabsList>

        {/* Write Tab */}
        <TabsContent value="write" className="space-y-4">
          {/* Security Toggle */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Nueva Entrada</h3>
            <div className="flex items-center gap-2">
              {password && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleSecureMode}
                  className={secureMode ? 'bg-red-100 border-red-300' : ''}
                >
                  {secureMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  Modo {secureMode ? 'Seguro' : 'Normal'}
                </Button>
              )}
              <Button onClick={() => setShowNewEntry(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Entrada
              </Button>
            </div>
          </div>

          {/* Type Selection */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {journalTypes.map((type) => (
              <Card 
                key={type.id}
                className={`cursor-pointer transition-all ${
                  selectedType === type.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="text-xl">{type.icon}</span>
                    {type.name}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {type.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="text-xs">
                    {getTypeStats().find(s => s.id === type.id)?.count || 0} entradas
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Writing Prompts */}
          <Card className={journalTypes.find(t => t.id === selectedType)?.color}>
            <CardHeader>
              <CardTitle className="text-base">
                💡 Prompts para {journalTypes.find(t => t.id === selectedType)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                {journalTypes.find(t => t.id === selectedType)?.prompts.map((prompt, i) => (
                  <div 
                    key={i} 
                    className="p-2 bg-white/50 rounded cursor-pointer hover:bg-white/70"
                    onClick={() => setNewEntry({...newEntry, content: newEntry.content + prompt + '\n\n'})}
                  >
                    {prompt}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Entries Tab */}
        <TabsContent value="entries" className="space-y-4">
          {/* Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar en tus entradas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Entries List */}
          <div className="space-y-3">
            {filteredEntries.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No hay entradas que mostrar</p>
                  <p className="text-sm">Comienza escribiendo tu primera entrada</p>
                </CardContent>
              </Card>
            ) : (
              filteredEntries.map((entry) => (
                <Card key={entry.id} className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedEntry(entry)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <span className="text-lg">
                          {journalTypes.find(t => t.id === entry.type)?.icon}
                        </span>
                        {entry.title}
                        {entry.encrypted && <Lock className="w-4 h-4 text-red-500" />}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {entry.mood && (
                          <Badge variant="outline" className="text-xs">
                            {entry.mood}/10 😊
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {journalTypes.find(t => t.id === entry.type)?.name}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>
                      {new Date(entry.date).toLocaleDateString()} - {entry.content.substring(0, 100)}...
                    </CardDescription>
                  </CardHeader>
                  {entry.tags && entry.tags.length > 0 && (
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1">
                        {entry.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Types Tab */}
        <TabsContent value="types" className="space-y-4">
          <div className="space-y-4">
            {journalTypes.map((type) => (
              <Card key={type.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{type.icon}</span>
                    {type.name}
                  </CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">✨ Beneficios</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {type.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">💡 Prompts de ejemplo</h4>
                      <div className="text-sm text-muted-foreground">
                        {type.prompts.slice(0, 2).join(' • ')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-4">
          {/* What is Journaling */}
          <Card>
            <CardHeader>
              <CardTitle>📖 ¿Qué es el Journaling?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                El journaling es la práctica de escribir regularmente sobre tus pensamientos, sentimientos, 
                experiencias y reflexiones. Es una herramienta poderosa para el autoconocimiento, 
                la regulación emocional y el crecimiento personal.
              </p>
              
              <div>
                <h4 className="font-medium mb-2">🎯 Cómo empezar</h4>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Elige un momento del día (mañana o noche)</li>
                  <li>Empieza con 5-10 minutos diarios</li>
                  <li>No te preocupes por la gramática o perfección</li>
                  <li>Sé honesto contigo mismo</li>
                  <li>Mantén la consistencia</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>🌟 Efectos en tu bienestar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <Brain className="w-4 h-4 text-blue-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Salud Mental</div>
                    <div className="text-muted-foreground">Reduce ansiedad, mejora claridad mental y autoconocimiento</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-red-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Salud Emocional</div>
                    <div className="text-muted-foreground">Procesa emociones, desarrolla resiliencia y autocompasión</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Productividad</div>
                    <div className="text-muted-foreground">Clarifica objetivos, mejora toma de decisiones</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What You Need */}
          <Card>
            <CardHeader>
              <CardTitle>🛠️ ¿Qué necesitas para hacerlo?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">📝 Físico</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Cuaderno o libreta</li>
                    <li>Bolígrafo cómodo</li>
                    <li>Lugar tranquilo</li>
                    <li>10-20 minutos diarios</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">💻 Digital</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Esta aplicación</li>
                    <li>Contraseña para privacidad</li>
                    <li>Dispositivo con internet</li>
                    <li>Backup de tus entradas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Entry Modal */}
      <Dialog open={showNewEntry} onOpenChange={setShowNewEntry}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-lg">{journalTypes.find(t => t.id === selectedType)?.icon}</span>
              Nueva Entrada - {journalTypes.find(t => t.id === selectedType)?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título (opcional)</Label>
              <Input
                id="title"
                value={newEntry.title}
                onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                placeholder="Ej: Reflexiones sobre mi día"
              />
            </div>

            <div>
              <Label htmlFor="content">Contenido</Label>
              <Textarea
                id="content"
                value={newEntry.content}
                onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                placeholder="Escribe tus pensamientos aquí..."
                className="min-h-32"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mood">Estado de ánimo (1-10)</Label>
                <Select value={newEntry.mood.toString()} onValueChange={(value) => setNewEntry({...newEntry, mood: parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num <= 3 ? '😢' : num <= 6 ? '😐' : '😊'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags">Etiquetas (separadas por coma)</Label>
                <Input
                  id="tags"
                  value={newEntry.tags}
                  onChange={(e) => setNewEntry({...newEntry, tags: e.target.value})}
                  placeholder="trabajo, familia, reflexión"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="encrypted"
                checked={newEntry.encrypted}
                onChange={(e) => setNewEntry({...newEntry, encrypted: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="encrypted" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Entrada privada (requiere contraseña)
              </Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={createEntry} disabled={!newEntry.content.trim()}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Guardar Entrada
              </Button>
              <Button variant="outline" onClick={() => setShowNewEntry(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Password Setup Modal */}
      <Dialog open={showPasswordSetup} onOpenChange={setShowPasswordSetup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Configurar Modo Seguro
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Crea una contraseña para proteger tus entradas privadas. Esta contraseña se guardará localmente.
            </p>
            
            <div>
              <Label htmlFor="password">Contraseña (mínimo 4 caracteres)</Label>
              <Input
                id="password"
                type="password"
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={setupPassword} disabled={enteredPassword.length < 4}>
                Configurar
              </Button>
              <Button variant="outline" onClick={() => setShowPasswordSetup(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Entry Detail Modal */}
      {selectedEntry && (
        <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{journalTypes.find(t => t.id === selectedEntry.type)?.icon}</span>
                  {selectedEntry.title}
                </div>
                <Button variant="outline" size="sm" onClick={() => deleteEntry(selectedEntry.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{new Date(selectedEntry.date).toLocaleDateString()}</span>
                {selectedEntry.mood && (
                  <Badge variant="outline">Humor: {selectedEntry.mood}/10</Badge>
                )}
                <Badge variant="outline">{journalTypes.find(t => t.id === selectedEntry.type)?.name}</Badge>
              </div>

              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-sm">{selectedEntry.content}</div>
              </div>

              {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
