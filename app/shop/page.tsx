
"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Gem,
  Play,
  Crown,
  Shirt,
  Palette,
  Star,
  Gift,
  Timer,
  Shield,
  Zap,
  Package,
  Check
} from "lucide-react"
import { UserStatsDisplay } from "@/components/gamification/user-stats"
import { ProtectedRoute } from "@/auth/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useAuth } from "@/auth/auth-provider"

interface ShopItem {
  id: string
  name: string
  description: string
  icon: any
  cost: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  type: 'avatar' | 'powerup'
  category?: string
  duration?: number
  effect?: string
}

interface InventoryItem extends ShopItem {
  equipped?: boolean
  purchasedAt: string
}

export default function ShopPage() {
  const { user, updateUser } = useAuth()
  const [watchingAd, setWatchingAd] = useState(false)
  const [lastDailyReward, setLastDailyReward] = useState<string | null>(null)
  const [inventory, setInventory] = useState<InventoryItem[]>([])

  const gems = user?.gems || 0

  useEffect(() => {
    const stored = localStorage.getItem('lastDailyReward')
    setLastDailyReward(stored)

    // Load inventory from localStorage
    const storedInventory = localStorage.getItem(`inventory_${user?.email}`)
    if (storedInventory) {
      setInventory(JSON.parse(storedInventory))
    }
  }, [user?.email])

  const saveInventory = (newInventory: InventoryItem[]) => {
    setInventory(newInventory)
    localStorage.setItem(`inventory_${user?.email}`, JSON.stringify(newInventory))
  }

  const canClaimDailyReward = () => {
    if (!lastDailyReward) return true
    const last = new Date(lastDailyReward)
    const now = new Date()
    const hoursDiff = (now.getTime() - last.getTime()) / (1000 * 60 * 60)
    return hoursDiff >= 24
  }

  const claimDailyReward = () => {
    if (canClaimDailyReward()) {
      const newGems = (user?.gems || 0) + 10
      updateUser({ gems: newGems })
      const now = new Date().toISOString()
      localStorage.setItem('lastDailyReward', now)
      setLastDailyReward(now)
    }
  }

  const handleWatchAd = () => {
    setWatchingAd(true)
    setTimeout(() => {
      const newGems = (user?.gems || 0) + 5
      updateUser({ gems: newGems })
      setWatchingAd(false)
    }, 3000)
  }

  const purchaseItem = (item: ShopItem) => {
    if (gems >= item.cost) {
      const newGems = gems - item.cost
      updateUser({ gems: newGems })
      
      const purchasedItem: InventoryItem = {
        ...item,
        purchasedAt: new Date().toISOString(),
        equipped: false
      }
      
      const newInventory = [...inventory, purchasedItem]
      saveInventory(newInventory)
    }
  }

  const equipItem = (itemId: string) => {
    const newInventory = inventory.map(item => {
      if (item.type === 'avatar') {
        // Unequip all items of same category
        if (item.category === inventory.find(i => i.id === itemId)?.category) {
          return { ...item, equipped: false }
        }
      }
      if (item.id === itemId) {
        return { ...item, equipped: true }
      }
      return item
    })
    saveInventory(newInventory)
  }

  const unequipItem = (itemId: string) => {
    const newInventory = inventory.map(item => 
      item.id === itemId ? { ...item, equipped: false } : item
    )
    saveInventory(newInventory)
  }

  const isItemOwned = (itemId: string) => inventory.some(item => item.id === itemId)

  // Shop items with meaningful backstories
  const getDailyShopItems = (): ShopItem[] => {
    const today = new Date().toDateString()
    const seed = today.split('').reduce((a, b) => a + b.charCodeAt(0), 0)

    const allItems: ShopItem[] = [
      {
        id: "golden-crown",
        name: "Corona del Emperador",
        description: "Forjada en los gimnasios de la antigua Grecia, otorga +20% XP en entrenamientos",
        icon: Crown,
        cost: 150,
        rarity: "legendary",
        type: "avatar",
        category: "head",
        effect: "xp_boost_workout"
      },
      {
        id: "platinum-crown",
        name: "Corona de Platino",
        description: "Símbolo de dedicación inquebrantable, usada por campeones olímpicos",
        icon: Crown,
        cost: 200,
        rarity: "legendary",
        type: "avatar",
        category: "head",
        effect: "all_stats_boost"
      },
      {
        id: "training-shirt",
        name: "Camiseta del Gladiador",
        description: "Tejida con fibras de determinación pura, mejora resistencia",
        icon: Shirt,
        cost: 75,
        rarity: "epic",
        type: "avatar",
        category: "body",
        effect: "stamina_boost"
      },
      {
        id: "vintage-shirt",
        name: "Camiseta Vintage '84",
        description: "De la era dorada del fitness, inspira nostalgia y motivación",
        icon: Shirt,
        cost: 45,
        rarity: "rare",
        type: "avatar",
        category: "body",
        effect: "motivation_boost"
      },
      {
        id: "neon-theme",
        name: "Tema Cyber Neón",
        description: "Del futuro del fitness, aumenta precisión en ejercicios",
        icon: Palette,
        cost: 90,
        rarity: "epic",
        type: "avatar",
        category: "theme",
        effect: "precision_boost"
      },
      {
        id: "dark-theme",
        name: "Tema Sombras Nocturnas",
        description: "Para los guerreros nocturnos del gimnasio",
        icon: Palette,
        cost: 60,
        rarity: "rare",
        type: "avatar",
        category: "theme",
        effect: "night_vision"
      },
      {
        id: "celestial-halo",
        name: "Halo Celestial",
        description: "Bendición divina para los más dedicados",
        icon: Star,
        cost: 180,
        rarity: "legendary",
        type: "avatar",
        category: "accessory",
        effect: "divine_blessing"
      }
    ]

    const shuffled = allItems.sort(() => (seed % 2) - 0.5)
    return shuffled.slice(0, 3)
  }

  const getDailyPowerUps = (): ShopItem[] => {
    const today = new Date().toDateString()
    const seed = today.split('').reduce((a, b) => a + b.charCodeAt(0), 0) + 100

    const allPowerUps: ShopItem[] = [
      {
        id: "streak-freeze-task",
        name: "Congelador de Racha Específica",
        description: "Protege una racha específica por 24h, usado por atletas profesionales",
        icon: Timer,
        cost: 25,
        rarity: "rare",
        type: "powerup",
        duration: 24,
        effect: "streak_protection"
      },
      {
        id: "streak-freeze-day",
        name: "Congelador de Racha Total",
        description: "Protege todas tus rachas por 24h, poder de los campeones",
        icon: Shield,
        cost: 40,
        rarity: "epic",
        type: "powerup",
        duration: 24,
        effect: "total_streak_protection"
      },
      {
        id: "xp-boost",
        name: "Elixir de Sabiduría",
        description: "Duplica tu XP por 24h, secreto de los maestros antiguos",
        icon: Zap,
        cost: 45,
        rarity: "epic",
        type: "powerup",
        duration: 24,
        effect: "double_xp"
      },
      {
        id: "gem-multiplier",
        name: "Multiplicador de Gemas",
        description: "x2 gemas por 12h, bendición de la fortuna",
        icon: Gem,
        cost: 50,
        rarity: "epic",
        type: "powerup",
        duration: 12,
        effect: "double_gems"
      },
      {
        id: "total-protection",
        name: "Escudo Divino",
        description: "Inmunidad total por 48h, don de los dioses del fitness",
        icon: Shield,
        cost: 90,
        rarity: "legendary",
        type: "powerup",
        duration: 48,
        effect: "total_immunity"
      },
      {
        id: "mega-xp-boost",
        name: "Poción del Maestro",
        description: "x3 XP por 8h, elixir supremo de los grandes maestros",
        icon: Zap,
        cost: 75,
        rarity: "legendary",
        type: "powerup",
        duration: 8,
        effect: "triple_xp"
      }
    ]

    const shuffled = allPowerUps.sort(() => (seed % 2) - 0.5)
    return shuffled.slice(0, 4)
  }

  const avatarItems = getDailyShopItems()
  const powerUps = getDailyPowerUps()

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-gray-500 border-gray-500/20 bg-gray-50"
      case "rare": return "text-blue-500 border-blue-500/20 bg-blue-50"
      case "epic": return "text-purple-500 border-purple-500/20 bg-purple-50"
      case "legendary": return "text-yellow-500 border-yellow-500/20 bg-yellow-50"
      default: return "text-gray-500 border-gray-500/20 bg-gray-50"
    }
  }

  return (
    <ProtectedRoute>
      <SidebarLayout
        breadcrumbs={[
          { label: "🛒 Tienda" }
        ]}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">🛒 Tienda HealthMaxx</h1>
              <p className="text-muted-foreground">
                Personaliza tu experiencia y obtén ventajas legendarias
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Gem className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold text-blue-500">{gems}</span>
            </div>
          </div>

          <UserStatsDisplay />

          {/* Free Gems Section */}
          <Card className="border-green-500/20 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Play className="w-5 h-5" />
                💎 Gana Gemas Gratis
              </CardTitle>
              <CardDescription>
                Ve anuncios para ganar gemas y apoyar a HealthMaxx
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-green-700">+5 Gemas por anuncio</p>
                  <p className="text-sm text-muted-foreground">
                    Disponible cada 15 minutos
                  </p>
                </div>
                <Button 
                  onClick={handleWatchAd} 
                  disabled={watchingAd}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {watchingAd ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Viendo...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Ver Anuncio
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="shop" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="shop">🛍️ Tienda</TabsTrigger>
              <TabsTrigger value="inventory">📦 Inventario</TabsTrigger>
              <TabsTrigger value="powerups">⚡ Power-ups</TabsTrigger>
            </TabsList>

            <TabsContent value="shop" className="space-y-4">
              <div className="text-center mb-4 p-3 bg-muted/50 rounded-lg border">
                <p className="text-sm text-muted-foreground">
                  🔄 <strong>Rotación diaria:</strong> Los objetos cambian cada 24 horas - ¡No pierdas las ofertas especiales!
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {avatarItems.map((item) => {
                  const owned = isItemOwned(item.id)
                  return (
                    <Card key={item.id} className={`${getRarityColor(item.rarity)} transition-all hover:scale-105`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <item.icon className="w-8 h-8" />
                          <Badge variant="outline" className={getRarityColor(item.rarity)}>
                            {item.rarity}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription className="text-xs">{item.description}</CardDescription>
                        {item.effect && (
                          <Badge variant="secondary" className="text-xs">
                            {item.effect.replace('_', ' ')}
                          </Badge>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Gem className="w-4 h-4 text-blue-500" />
                            <span className="font-semibold">{item.cost}</span>
                          </div>
                          {owned ? (
                            <Badge variant="default" className="bg-green-500">
                              <Check className="w-4 h-4 mr-1" />
                              Obtenido
                            </Badge>
                          ) : (
                            <Button
                              variant="outline"
                              onClick={() => purchaseItem(item)}
                              disabled={gems < item.cost}
                            >
                              Comprar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              {inventory.length === 0 ? (
                <Card className="text-center p-8">
                  <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Inventario Vacío</h3>
                  <p className="text-muted-foreground">
                    ¡Compra algunos objetos en la tienda para personalizar tu experiencia!
                  </p>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {inventory.map((item) => (
                    <Card key={item.id} className={`${getRarityColor(item.rarity)} ${item.equipped ? 'ring-2 ring-green-500' : ''}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <item.icon className="w-8 h-8" />
                          <div className="flex gap-2">
                            <Badge variant="outline" className={getRarityColor(item.rarity)}>
                              {item.rarity}
                            </Badge>
                            {item.equipped && (
                              <Badge className="bg-green-500">Equipado</Badge>
                            )}
                          </div>
                        </div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription className="text-xs">{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {item.type === 'avatar' && (
                          <Button
                            variant={item.equipped ? "outline" : "default"}
                            onClick={() => item.equipped ? unequipItem(item.id) : equipItem(item.id)}
                            className="w-full"
                          >
                            {item.equipped ? "Desequipar" : "Equipar"}
                          </Button>
                        )}
                        {item.type === 'powerup' && (
                          <Badge variant="secondary" className="w-full justify-center">
                            Power-up: {item.duration}h
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="powerups" className="space-y-4">
              <div className="text-center mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-700">
                  ⚡ <strong>Power-ups activos:</strong> Los efectos se aplican automáticamente tras la compra
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {powerUps.map((item) => {
                  const owned = isItemOwned(item.id)
                  return (
                    <Card key={item.id} className="border-orange-500/20 bg-gradient-to-br from-orange-50 to-amber-50">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <item.icon className="w-8 h-8 text-orange-600" />
                          <Badge className="bg-orange-100 text-orange-700">
                            {item.duration}h
                          </Badge>
                        </div>
                        <CardTitle className="text-lg text-orange-800">{item.name}</CardTitle>
                        <CardDescription className="text-xs">{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Gem className="w-4 h-4 text-blue-500" />
                            <span className="font-semibold">{item.cost}</span>
                          </div>
                          {owned ? (
                            <Badge variant="default" className="bg-green-500">
                              <Check className="w-4 h-4 mr-1" />
                              Activado
                            </Badge>
                          ) : (
                            <Button
                              variant="outline"
                              onClick={() => purchaseItem(item)}
                              disabled={gems < item.cost}
                            >
                              Activar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>

          {/* Daily Reward */}
          <Card className="border-purple-500/20 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Gift className="w-5 h-5" />
                🎁 Recompensa Diaria
              </CardTitle>
              <CardDescription>
                Inicia sesión todos los días para obtener gemas gratis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-purple-700">+10 Gemas</p>
                  <p className="text-sm text-muted-foreground">
                    {canClaimDailyReward() ? "¡Disponible ahora!" : "Ya reclamado hoy"}
                  </p>
                </div>
                <Button
                  onClick={claimDailyReward}
                  disabled={!canClaimDailyReward()}
                  className={canClaimDailyReward() ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  {canClaimDailyReward() ? "Reclamar" : "Reclamado"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
