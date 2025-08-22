'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Shield, 
  Brain, 
  Heart, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  X,
  Plus,
  Calendar,
  Target,
  Activity,
  Zap
} from 'lucide-react';

interface Addiction {
  id: string;
  name: string;
  icon: string;
  description: string;
  effects: string[];
  causes: string[];
  keyMessages: string[];
  quitStrategies: string[];
  benefits: string[];
  difficulty: 'Fácil' | 'Moderado' | 'Difícil' | 'Muy Difícil';
}

interface DailyRecord {
  date: string;
  impulses: number;
  resistances: number;
  notes: string;
}

const addictions: Addiction[] = [
  {
    id: 'fap-porn',
    name: 'Fap con Porno',
    icon: '🚫',
    description: 'Masturbación compulsiva combinada con consumo de pornografía',
    effects: [
      'Desensibilización de la respuesta sexual',
      'Disfunción eréctil o problemas de excitación',
      'Expectativas irreales sobre sexualidad',
      'Reducción de dopamina y motivación',
      'Aislamiento social y problemas de pareja',
      'Ansiedad y depresión'
    ],
    causes: [
      'Estrés y ansiedad',
      'Aburrimiento y tiempo libre',
      'Baja autoestima',
      'Falta de educación sexual',
      'Acceso fácil a contenido',
      'Mecanismo de escape emocional'
    ],
    keyMessages: [
      'Es un hábito normal que se puede cambiar',
      'La energía sexual se puede canalizar positivamente',
      'La recuperación lleva tiempo pero es posible',
      'No defines tu valor como persona'
    ],
    quitStrategies: [
      'Bloquear acceso a contenido pornográfico',
      'Identificar y evitar triggers',
      'Desarrollar rutinas de ejercicio físico',
      'Practicar mindfulness y meditación',
      'Buscar actividades sociales y hobbies',
      'Terapia profesional si es necesario'
    ],
    benefits: [
      'Mayor energía y motivación',
      'Mejor autoestima y confianza',
      'Relaciones más auténticas',
      'Mayor sensibilidad y placer real',
      'Mejor concentración y productividad'
    ],
    difficulty: 'Difícil'
  },
  {
    id: 'fap-no-porn',
    name: 'Fap sin Porno',
    icon: '🤲',
    description: 'Masturbación excesiva sin consumo de pornografía',
    effects: [
      'Pérdida de energía y motivación',
      'Reducción temporal de testosterona',
      'Posible sensibilidad reducida',
      'Culpa o ansiedad post-masturbación',
      'Interferencia con actividades diarias'
    ],
    causes: [
      'Hábito automático',
      'Estrés y ansiedad',
      'Aburrimiento',
      'Impulsos sexuales naturales sin canalizar',
      'Falta de actividades satisfactorias'
    ],
    keyMessages: [
      'Es completamente natural y normal',
      'La moderación es clave, no la abstinencia total',
      'Cada persona tiene un equilibrio diferente',
      'No hay "frecuencia correcta" universal'
    ],
    quitStrategies: [
      'Establecer horarios y límites',
      'Canalizar energía en ejercicio',
      'Desarrollar hobbies satisfactorios',
      'Técnicas de respiración para impulsos',
      'Mindfulness para reconocer triggers'
    ],
    benefits: [
      'Mayor energía para otros objetivos',
      'Mejor autocontrol general',
      'Sensaciones más intensas cuando ocurre',
      'Mayor motivación para conexiones reales'
    ],
    difficulty: 'Moderado'
  },
  {
    id: 'tobacco',
    name: 'Tabaco',
    icon: '🚬',
    description: 'Dependencia a la nicotina a través del tabaco tradicional',
    effects: [
      'Cáncer de pulmón, garganta, vejiga',
      'Enfermedades cardiovasculares',
      'Enfisema y EPOC',
      'Envejecimiento prematuro de la piel',
      'Reducción del olfato y gusto',
      'Dependencia física y psicológica'
    ],
    causes: [
      'Dependencia química a la nicotina',
      'Hábitos sociales y rituales',
      'Manejo del estrés',
      'Presión social o cultural',
      'Asociación con actividades diarias'
    ],
    keyMessages: [
      'Nunca es tarde para dejar de fumar',
      'Los beneficios empiezan en 20 minutos',
      'La dependencia es tratable',
      'Muchas personas lo han logrado'
    ],
    quitStrategies: [
      'Terapia de reemplazo de nicotina',
      'Medicamentos prescritos (bupropión, varenicline)',
      'Terapia cognitivo-conductual',
      'Grupos de apoyo',
      'Cambio de rutinas asociadas',
      'Técnicas de relajación'
    ],
    benefits: [
      'Reducción del riesgo de cáncer',
      'Mejor capacidad pulmonar',
      'Ahorro económico significativo',
      'Mejor olfato y gusto',
      'Piel más saludable',
      'Mayor esperanza de vida'
    ],
    difficulty: 'Muy Difícil'
  },
  {
    id: 'vaping',
    name: 'Váper',
    icon: '💨',
    description: 'Dependencia a dispositivos de vapeo y nicotina líquida',
    effects: [
      'Dependencia a la nicotina',
      'Irritación pulmonar',
      'Inflamación de vías respiratorias',
      'Posibles efectos desconocidos a largo plazo',
      'Gasto económico constante'
    ],
    causes: [
      'Transición desde tabaco tradicional',
      'Marketing dirigido a jóvenes',
      'Percepción de "menor daño"',
      'Sabores atractivos',
      'Facilidad de uso discreto'
    ],
    keyMessages: [
      'No es una alternativa completamente segura',
      'Sigue generando dependencia',
      'Los efectos a largo plazo son inciertos',
      'Es posible dejarlo gradualmente'
    ],
    quitStrategies: [
      'Reducción gradual de nicotina',
      'Reemplazo de hábitos orales',
      'Técnicas de respiración',
      'Apoyo profesional',
      'Eliminar dispositivos y líquidos'
    ],
    benefits: [
      'Eliminación de dependencia',
      'Mejor salud respiratoria',
      'Ahorro económico',
      'Eliminación de químicos desconocidos'
    ],
    difficulty: 'Difícil'
  },
  {
    id: 'sugar',
    name: 'Azúcar',
    icon: '🍬',
    description: 'Consumo excesivo de azúcares añadidos y productos dulces',
    effects: [
      'Diabetes tipo 2',
      'Obesidad y sobrepeso',
      'Caries dentales',
      'Fluctuaciones de energía',
      'Inflamación crónica',
      'Adicción y antojos'
    ],
    causes: [
      'Respuesta de dopamina al dulce',
      'Hábitos desde la infancia',
      'Estrés y emociones',
      'Marketing de productos procesados',
      'Disponibilidad constante'
    ],
    keyMessages: [
      'Los antojos disminuyen con el tiempo',
      'Existen alternativas naturales deliciosas',
      'La energía se estabiliza sin azúcar',
      'Es un proceso gradual, no radical'
    ],
    quitStrategies: [
      'Reducción gradual en lugar de eliminación total',
      'Lectura de etiquetas nutricionales',
      'Sustitutos naturales (stevia, fruta)',
      'Comidas regulares para evitar antojos',
      'Hidratación adecuada'
    ],
    benefits: [
      'Pérdida de peso sostenible',
      'Energía más estable',
      'Mejor salud dental',
      'Reducción del riesgo de diabetes',
      'Piel más clara'
    ],
    difficulty: 'Moderado'
  },
  {
    id: 'ultra-processed',
    name: 'Comida Ultraprocesada',
    icon: '🍟',
    description: 'Dependencia a alimentos altamente procesados e industriales',
    effects: [
      'Obesidad y sobrepeso',
      'Enfermedades cardiovasculares',
      'Diabetes tipo 2',
      'Deficiencias nutricionales',
      'Inflamación crónica',
      'Adicción alimentaria'
    ],
    causes: [
      'Palatabilidad diseñada científicamente',
      'Conveniencia y rapidez',
      'Marketing agresivo',
      'Falta de tiempo para cocinar',
      'Disponibilidad ubicua'
    ],
    keyMessages: [
      'Los alimentos reales son más satisfactorios',
      'Cocinar es una habilidad aprendible',
      'La transición puede ser gradual',
      'Tu paladar se adaptará a sabores naturales'
    ],
    quitStrategies: [
      'Planificación de comidas',
      'Batch cooking (cocinar por lotes)',
      'Lectura de ingredientes',
      'Compras en mercados locales',
      'Aprender recetas simples'
    ],
    benefits: [
      'Mejor nutrición general',
      'Pérdida de peso natural',
      'Mayor energía sostenida',
      'Mejor digestión',
      'Ahorro económico a largo plazo'
    ],
    difficulty: 'Moderado'
  },
  {
    id: 'videogames',
    name: 'Videojuegos',
    icon: '🎮',
    description: 'Uso compulsivo de videojuegos que interfiere con la vida diaria',
    effects: [
      'Aislamiento social',
      'Problemas de sueño',
      'Bajo rendimiento académico/laboral',
      'Problemas de postura y salud física',
      'Irritabilidad cuando no se juega',
      'Pérdida de interés en otras actividades'
    ],
    causes: [
      'Diseño adictivo de los juegos',
      'Escapismo de problemas reales',
      'Recompensas inmediatas',
      'Conexión social online',
      'Falta de actividades alternativas satisfactorias'
    ],
    keyMessages: [
      'Los videojuegos pueden ser parte de una vida equilibrada',
      'El problema es el exceso, no la actividad en sí',
      'Hay vida interesante fuera de las pantallas',
      'El autocontrol se puede desarrollar'
    ],
    quitStrategies: [
      'Establecer límites de tiempo estrictos',
      'Usar aplicaciones de control parental',
      'Desarrollar hobbies alternativos',
      'Ejercicio físico regular',
      'Socialización en persona'
    ],
    benefits: [
      'Mejor rendimiento en responsabilidades',
      'Relaciones sociales más profundas',
      'Mejor calidad de sueño',
      'Mayor creatividad en otras áreas',
      'Mejor salud física'
    ],
    difficulty: 'Moderado'
  },
  {
    id: 'gambling',
    name: 'Juegos de Azar',
    icon: '🎰',
    description: 'Compulsión a apostar dinero en juegos de azar',
    effects: [
      'Pérdidas financieras devastadoras',
      'Problemas familiares y de pareja',
      'Ansiedad y depresión',
      'Mentiras compulsivas',
      'Pérdida de trabajo o estudios',
      'Pensamientos suicidas en casos extremos'
    ],
    causes: [
      'Búsqueda de emociones intensas',
      'Ilusión de control sobre el azar',
      'Necesidad de escapar de problemas',
      'Refuerzo intermitente de las ganancias',
      'Problemas financieros previos'
    ],
    keyMessages: [
      'Las probabilidades siempre favorecen a la casa',
      'No existe "sistema" para ganar consistentemente',
      'La recuperación financiera es posible',
      'Buscar ayuda profesional es esencial'
    ],
    quitStrategies: [
      'Autoexclusión de casinos y plataformas',
      'Control financiero por terceros',
      'Terapia especializada en ludopatía',
      'Grupos de apoyo (Jugadores Anónimos)',
      'Actividades alternativas de adrenalina'
    ],
    benefits: [
      'Estabilidad financiera',
      'Relaciones familiares reparadas',
      'Reducción de ansiedad',
      'Recuperación de la autoestima',
      'Enfoque en objetivos reales'
    ],
    difficulty: 'Muy Difícil'
  },
  {
    id: 'shopping',
    name: 'Compras Impulsivas',
    icon: '🛍️',
    description: 'Compulsión a comprar productos innecesarios como mecanismo emocional',
    effects: [
      'Deudas y problemas financieros',
      'Acumulación de objetos innecesarios',
      'Sentimientos de culpa post-compra',
      'Ansiedad cuando no se puede comprar',
      'Problemas de relación por gastos',
      'Autoestima dependiente de posesiones'
    ],
    causes: [
      'Regulación emocional a través del consumo',
      'Marketing y presión social',
      'Búsqueda de estatus social',
      'Alivio temporal de emociones negativas',
      'Facilidad de compra online'
    ],
    keyMessages: [
      'La felicidad no se compra',
      'Las experiencias valen más que las cosas',
      'Menos posesiones, más libertad',
      'El minimalismo puede ser liberador'
    ],
    quitStrategies: [
      'Presupuesto estricto y seguimiento',
      'Regla de 24-48 horas antes de comprar',
      'Lista de necesidades vs deseos',
      'Eliminar apps de compras del teléfono',
      'Buscar satisfacción en experiencias'
    ],
    benefits: [
      'Estabilidad financiera',
      'Menos estrés por deudas',
      'Hogar más ordenado',
      'Mayor apreciación por lo que tienes',
      'Recursos para experiencias valiosas'
    ],
    difficulty: 'Moderado'
  },
  {
    id: 'alcohol',
    name: 'Alcohol',
    icon: '🍺',
    description: 'Consumo excesivo de bebidas alcohólicas',
    effects: [
      'Daño hepático (cirrosis, hepatitis)',
      'Problemas cardiovasculares',
      'Deterioro cognitivo y memoria',
      'Depresión y ansiedad',
      'Problemas sociales y familiares',
      'Riesgo de accidentes y violencia'
    ],
    causes: [
      'Presión social y cultural',
      'Automedicación para ansiedad/depresión',
      'Hábitos sociales arraigados',
      'Genética y predisposición',
      'Estrés y problemas de afrontamiento'
    ],
    keyMessages: [
      'Es posible disfrutar la vida sin alcohol',
      'La sobriedad trae claridad mental',
      'Muchas culturas no centran la socialización en alcohol',
      'La dependencia es una enfermedad tratable'
    ],
    quitStrategies: [
      'Reducción gradual supervisada médicamente',
      'Terapia individual y grupal',
      'Medicamentos para reducir antojos',
      'Cambio de círculos sociales si necesario',
      'Actividades sociales alternativas'
    ],
    benefits: [
      'Mejor salud hepática',
      'Mayor claridad mental',
      'Mejor calidad de sueño',
      'Ahorro económico significativo',
      'Relaciones más auténticas'
    ],
    difficulty: 'Muy Difícil'
  },
  {
    id: 'social-media',
    name: 'Redes Sociales',
    icon: '📱',
    description: 'Uso compulsivo de plataformas de redes sociales',
    effects: [
      'Ansiedad y depresión por comparación',
      'Problemas de sueño por uso nocturno',
      'Reducción de la capacidad de concentración',
      'FOMO (miedo a perderse algo)',
      'Aislamiento social paradójico',
      'Autoestima dependiente de likes y comentarios'
    ],
    causes: [
      'Diseño adictivo de las plataformas',
      'Refuerzo intermitente de notificaciones',
      'Necesidad de validación social',
      'Escapismo de la realidad',
      'Aburrimiento y tiempo libre'
    ],
    keyMessages: [
      'Las redes muestran vidas editadas, no reales',
      'Tu valor no depende de métricas online',
      'La conexión real supera la virtual',
      'Es posible usar tecnología conscientemente'
    ],
    quitStrategies: [
      'Desactivar notificaciones',
      'Establecer horarios específicos de uso',
      'Eliminar apps del teléfono',
      'Digital detox periódicos',
      'Actividades offline satisfactorias'
    ],
    benefits: [
      'Mayor productividad y concentración',
      'Mejor calidad de sueño',
      'Relaciones más profundas',
      'Mayor autoestima genuina',
      'Más tiempo para hobbies reales'
    ],
    difficulty: 'Moderado'
  }
];

export default function AddictionManagement() {
  const [selectedAddiction, setSelectedAddiction] = useState<Addiction | null>(null);
  const [dailyRecords, setDailyRecords] = useState<DailyRecord[]>([]);
  const [todayRecord, setTodayRecord] = useState<DailyRecord>({
    date: new Date().toISOString().split('T')[0],
    impulses: 0,
    resistances: 0,
    notes: ''
  });

  useEffect(() => {
    // Load daily records from localStorage
    const saved = localStorage.getItem('addiction-records');
    if (saved) {
      setDailyRecords(JSON.parse(saved));
    }
  }, []);

  const saveDailyRecord = () => {
    const today = new Date().toISOString().split('T')[0];
    const existingIndex = dailyRecords.findIndex(record => record.date === today);
    
    let newRecords;
    if (existingIndex >= 0) {
      newRecords = [...dailyRecords];
      newRecords[existingIndex] = todayRecord;
    } else {
      newRecords = [...dailyRecords, todayRecord];
    }
    
    setDailyRecords(newRecords);
    localStorage.setItem('addiction-records', JSON.stringify(newRecords));
  };

  const getRecentRecords = () => {
    return dailyRecords
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 7);
  };

  const getSuccessRate = () => {
    const recent = getRecentRecords();
    if (recent.length === 0) return 0;
    
    const totalSituations = recent.reduce((sum, record) => sum + record.impulses + record.resistances, 0);
    const totalResistances = recent.reduce((sum, record) => sum + record.resistances, 0);
    
    return totalSituations > 0 ? Math.round((totalResistances / totalSituations) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Shield className="w-8 h-8 text-blue-500" />
          Gestión de Adicciones
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Supera hábitos no saludables con información científica, estrategias probadas y seguimiento diario
        </p>
      </div>

      {/* Daily Tracker */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Registro Diario - {new Date().toLocaleDateString()}
          </CardTitle>
          <CardDescription>
            Registra tus impulsos y resistencias exitosas para trackear tu progreso
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="impulses">Impulsos experimentados hoy</Label>
              <Input
                id="impulses"
                type="number"
                min="0"
                value={todayRecord.impulses}
                onChange={(e) => setTodayRecord({...todayRecord, impulses: parseInt(e.target.value) || 0})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="resistances">Veces que resististe exitosamente</Label>
              <Input
                id="resistances"
                type="number"
                min="0"
                value={todayRecord.resistances}
                onChange={(e) => setTodayRecord({...todayRecord, resistances: parseInt(e.target.value) || 0})}
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes">Notas del día (opcional)</Label>
            <Input
              id="notes"
              value={todayRecord.notes}
              onChange={(e) => setTodayRecord({...todayRecord, notes: e.target.value})}
              placeholder="Ej: Me sentí tentado después del trabajo pero fui al gimnasio"
              className="mt-1"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Tasa de éxito últimos 7 días: <strong>{getSuccessRate()}%</strong>
            </div>
            <Button onClick={saveDailyRecord} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Guardar Registro
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      {dailyRecords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Tu Progreso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Tasa de Resistencia Exitosa</span>
                  <span className="text-sm">{getSuccessRate()}%</span>
                </div>
                <Progress value={getSuccessRate()} className="h-3" />
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {getRecentRecords().reverse().map((record, index) => {
                  const total = record.impulses + record.resistances;
                  const successRate = total > 0 ? (record.resistances / total) * 100 : 0;
                  return (
                    <div key={index} className="text-center">
                      <div className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold text-white ${
                        successRate >= 80 ? 'bg-green-500' :
                        successRate >= 60 ? 'bg-yellow-500' :
                        successRate >= 40 ? 'bg-orange-500' : 'bg-red-500'
                      }`}>
                        {Math.round(successRate)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(record.date).getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Addictions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {addictions.map((addiction) => (
          <Card 
            key={addiction.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedAddiction(addiction)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{addiction.icon}</span>
                  {addiction.name}
                </CardTitle>
                <Badge variant={
                  addiction.difficulty === 'Fácil' ? 'default' :
                  addiction.difficulty === 'Moderado' ? 'secondary' :
                  addiction.difficulty === 'Difícil' ? 'destructive' : 'destructive'
                }>
                  {addiction.difficulty}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">
                {addiction.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <div><strong>Efectos principales:</strong></div>
                <ul className="list-disc list-inside mt-1">
                  {addiction.effects.slice(0, 2).map((effect, i) => (
                    <li key={i}>{effect}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Addiction Detail Modal */}
      {selectedAddiction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{selectedAddiction.icon}</span>
                  {selectedAddiction.name}
                </CardTitle>
                <Button variant="outline" onClick={() => setSelectedAddiction(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>{selectedAddiction.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="effects" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="effects">Efectos</TabsTrigger>
                  <TabsTrigger value="causes">Causas</TabsTrigger>
                  <TabsTrigger value="messages">Mensajes</TabsTrigger>
                  <TabsTrigger value="strategies">Estrategias</TabsTrigger>
                  <TabsTrigger value="benefits">Beneficios</TabsTrigger>
                </TabsList>

                <TabsContent value="effects" className="space-y-3">
                  <h4 className="font-medium text-red-600">⚠️ Efectos en tu salud y vida</h4>
                  {selectedAddiction.effects.map((effect, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                      <span className="text-sm">{effect}</span>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="causes" className="space-y-3">
                  <h4 className="font-medium text-blue-600">🧠 Principales causas</h4>
                  {selectedAddiction.causes.map((cause, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                      <Brain className="w-4 h-4 text-blue-500 mt-0.5" />
                      <span className="text-sm">{cause}</span>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="messages" className="space-y-3">
                  <h4 className="font-medium text-purple-600">💜 Mensajes clave para normalizar</h4>
                  {selectedAddiction.keyMessages.map((message, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg">
                      <Heart className="w-4 h-4 text-purple-500 mt-0.5" />
                      <span className="text-sm">{message}</span>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="strategies" className="space-y-3">
                  <h4 className="font-medium text-orange-600">🛠️ Mejores formas de dejarlo</h4>
                  {selectedAddiction.quitStrategies.map((strategy, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg">
                      <Target className="w-4 h-4 text-orange-500 mt-0.5" />
                      <span className="text-sm">{strategy}</span>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="benefits" className="space-y-3">
                  <h4 className="font-medium text-green-600">✨ Beneficios de dejarlo</h4>
                  {selectedAddiction.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>

              {/* Health Benefits */}
              <Card className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800">🌟 Beneficios para otros tipos de salud</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <Brain className="w-4 h-4 text-blue-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Salud Mental</div>
                        <div className="text-muted-foreground">Mejor autocontrol, autoestima y claridad mental</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Heart className="w-4 h-4 text-red-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Salud Emocional</div>
                        <div className="text-muted-foreground">Mayor estabilidad emocional y resiliencia</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Salud Física</div>
                        <div className="text-muted-foreground">Mejor energía, sueño y funcionamiento corporal</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
