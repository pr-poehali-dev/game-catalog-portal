import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface GameBuild {
  id: number;
  name: string;
  price: number;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  image: string;
  performance: 'Начальный' | 'Средний' | 'Продвинутый' | 'Премиум';
}

const builds: GameBuild[] = [
  {
    id: 1,
    name: 'Cyber Starter',
    price: 45000,
    cpu: 'AMD Ryzen 5 5600',
    gpu: 'NVIDIA GTX 1660 Super',
    ram: '16GB DDR4',
    storage: '512GB NVMe SSD',
    image: 'https://cdn.poehali.dev/projects/7a3f92b4-13b1-42a7-aed7-c2f1f9858e70/files/524d582c-636f-44af-8230-73849f4f1ae6.jpg',
    performance: 'Начальный'
  },
  {
    id: 2,
    name: 'Neon Warrior',
    price: 85000,
    cpu: 'Intel Core i5-13400F',
    gpu: 'NVIDIA RTX 4060 Ti',
    ram: '32GB DDR5',
    storage: '1TB NVMe SSD',
    image: 'https://cdn.poehali.dev/projects/7a3f92b4-13b1-42a7-aed7-c2f1f9858e70/files/ffa39cfe-608e-46c6-893b-f84a9d5fd8c7.jpg',
    performance: 'Средний'
  },
  {
    id: 3,
    name: 'Elite Gaming',
    price: 135000,
    cpu: 'AMD Ryzen 7 7800X3D',
    gpu: 'NVIDIA RTX 4070 Ti',
    ram: '32GB DDR5',
    storage: '2TB NVMe SSD',
    image: 'https://cdn.poehali.dev/projects/7a3f92b4-13b1-42a7-aed7-c2f1f9858e70/files/fc1b9c7b-e645-4165-ae21-049543cbb4fa.jpg',
    performance: 'Продвинутый'
  },
  {
    id: 4,
    name: 'Ultra Beast',
    price: 220000,
    cpu: 'Intel Core i9-14900K',
    gpu: 'NVIDIA RTX 4090',
    ram: '64GB DDR5',
    storage: '4TB NVMe SSD',
    image: 'https://cdn.poehali.dev/projects/7a3f92b4-13b1-42a7-aed7-c2f1f9858e70/files/524d582c-636f-44af-8230-73849f4f1ae6.jpg',
    performance: 'Премиум'
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [priceRange, setPriceRange] = useState([0, 250000]);
  const [selectedPerformance, setSelectedPerformance] = useState<string[]>([]);

  const filteredBuilds = builds.filter(build => {
    const matchesPrice = build.price >= priceRange[0] && build.price <= priceRange[1];
    const matchesPerformance = selectedPerformance.length === 0 || selectedPerformance.includes(build.performance);
    return matchesPrice && matchesPerformance;
  });

  const togglePerformance = (perf: string) => {
    setSelectedPerformance(prev =>
      prev.includes(perf) ? prev.filter(p => p !== perf) : [...prev, perf]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            CYBER BUILDS
          </h1>
          <div className="flex gap-6">
            {['home', 'catalog', 'about', 'faq', 'profile'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium transition-all hover:text-primary ${
                  activeTab === tab ? 'text-primary glow-cyan' : 'text-muted-foreground'
                }`}
              >
                {tab === 'home' && 'Главная'}
                {tab === 'catalog' && 'Каталог'}
                {tab === 'about' && 'О проекте'}
                {tab === 'faq' && 'FAQ'}
                {tab === 'profile' && 'Профиль'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <section className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-glow-pulse" />
              <div className="relative z-10 py-24 px-8 text-center">
                <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Игровые ПК Нового Уровня
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Соберем идеальную конфигурацию для максимальной производительности в играх
                </p>
                <Button 
                  onClick={() => setActiveTab('catalog')}
                  size="lg" 
                  className="glow-cyan hover:scale-105 transition-transform"
                >
                  <Icon name="Zap" className="mr-2" size={20} />
                  Выбрать сборку
                </Button>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              {builds.slice(0, 3).map((build) => (
                <Card key={build.id} className="group hover:glow-purple transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={build.image} 
                      alt={build.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary/90 text-primary-foreground">{build.performance}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">{build.name}</CardTitle>
                    <CardDescription className="text-3xl font-bold text-primary">
                      {build.price.toLocaleString('ru-RU')} ₽
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="Cpu" size={16} className="text-primary" />
                        <span>{build.cpu}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Monitor" size={16} className="text-secondary" />
                        <span>{build.gpu}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full glow-cyan" onClick={() => setActiveTab('catalog')}>
                      Подробнее
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </section>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold mb-2">Каталог сборок</h2>
              <p className="text-muted-foreground">Найдите идеальную конфигурацию для ваших задач</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              <Card className="lg:col-span-1 h-fit sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="SlidersHorizontal" size={20} />
                    Фильтры
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-sm font-medium">Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽</label>
                    <Slider
                      min={0}
                      max={250000}
                      step={5000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Производительность</label>
                    <div className="flex flex-col gap-2">
                      {['Начальный', 'Средний', 'Продвинутый', 'Премиум'].map((perf) => (
                        <Badge
                          key={perf}
                          variant={selectedPerformance.includes(perf) ? 'default' : 'outline'}
                          className="cursor-pointer hover:scale-105 transition-transform justify-center"
                          onClick={() => togglePerformance(perf)}
                        >
                          {perf}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
                {filteredBuilds.map((build) => (
                  <Card key={build.id} className="group hover:glow-purple transition-all duration-300 overflow-hidden">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={build.image} 
                        alt={build.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary/90 text-primary-foreground">{build.performance}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl">{build.name}</CardTitle>
                      <CardDescription className="text-3xl font-bold text-primary">
                        {build.price.toLocaleString('ru-RU')} ₽
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Icon name="Cpu" size={16} className="text-primary" />
                          <span className="font-medium">CPU:</span>
                          <span className="text-muted-foreground">{build.cpu}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Monitor" size={16} className="text-secondary" />
                          <span className="font-medium">GPU:</span>
                          <span className="text-muted-foreground">{build.gpu}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="MemoryStick" size={16} className="text-accent" />
                          <span className="font-medium">RAM:</span>
                          <span className="text-muted-foreground">{build.ram}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="HardDrive" size={16} className="text-primary" />
                          <span className="font-medium">Хранилище:</span>
                          <span className="text-muted-foreground">{build.storage}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button className="flex-1 glow-cyan">
                        <Icon name="ShoppingCart" className="mr-2" size={16} />
                        Купить
                      </Button>
                      <Button variant="outline" size="icon">
                        <Icon name="Heart" size={16} />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                О проекте
              </h2>
              <p className="text-xl text-muted-foreground">
                Создаем игровые ПК для максимальной производительности
              </p>
            </div>

            <Card className="border-primary/20">
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 glow-cyan">
                      <Icon name="Target" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Наша миссия</h3>
                      <p className="text-muted-foreground">
                        Предоставить геймерам доступ к лучшим игровым сборкам по оптимальным ценам
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-secondary/10 glow-purple">
                      <Icon name="Award" size={24} className="text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Качество</h3>
                      <p className="text-muted-foreground">
                        Используем только проверенные комплектующие от ведущих производителей
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-accent/10 glow-pink">
                      <Icon name="Headphones" size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Поддержка</h3>
                      <p className="text-muted-foreground">
                        Гарантия на все сборки и техническая поддержка 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Частые вопросы
              </h2>
              <p className="text-xl text-muted-foreground">
                Ответы на популярные вопросы о наших сборках
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-lg hover:text-primary">
                  Какая гарантия на сборки?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  На все комплектующие предоставляется гарантия от 1 до 3 лет в зависимости от производителя. 
                  Также мы предоставляем собственную годовую гарантию на сборку.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-lg hover:text-primary">
                  Можно ли изменить конфигурацию?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, вы можете выбрать альтернативные комплектующие или заказать полностью индивидуальную сборку. 
                  Свяжитесь с нами для обсуждения деталей.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-lg hover:text-primary">
                  Сколько времени занимает сборка?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Стандартная сборка занимает 2-3 рабочих дня. При наличии всех комплектующих на складе — 
                  возможна сборка за 24 часа.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-lg hover:text-primary">
                  Есть ли доставка?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, мы доставляем по всей России. Стоимость и сроки доставки зависят от региона. 
                  В Москве и Санкт-Петербурге — курьерская доставка на следующий день.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-lg hover:text-primary">
                  Какие способы оплаты доступны?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Принимаем оплату картами, банковским переводом, через СБП. 
                  Также доступна рассрочка на 6-12 месяцев без переплаты.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Личный кабинет
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardContent className="pt-6 text-center space-y-4">
                  <Avatar className="w-24 h-24 mx-auto ring-4 ring-primary/20">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>ГМ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">Геймер Pro</h3>
                    <p className="text-sm text-muted-foreground">gamer@cyber.ru</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-primary to-secondary">
                    Премиум клиент
                  </Badge>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="User" size={20} />
                    Информация профиля
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Имя</label>
                      <p className="font-medium">Алексей</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Фамилия</label>
                      <p className="font-medium">Игроков</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Телефон</label>
                      <p className="font-medium">+7 (999) 123-45-67</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Город</label>
                      <p className="font-medium">Москва</p>
                    </div>
                  </div>
                  <Button className="w-full glow-cyan">
                    <Icon name="Pencil" className="mr-2" size={16} />
                    Редактировать профиль
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ShoppingBag" size={20} />
                  История покупок
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon name="Package" size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Neon Warrior</p>
                        <p className="text-sm text-muted-foreground">15 октября 2024</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">85 000 ₽</p>
                      <Badge variant="outline" className="mt-1">Доставлено</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <Icon name="Package" size={24} className="text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium">Cyber Starter</p>
                        <p className="text-sm text-muted-foreground">3 августа 2024</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">45 000 ₽</p>
                      <Badge variant="outline" className="mt-1">Доставлено</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">© 2024 Cyber Builds. Все права защищены.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
            <a href="#" className="hover:text-primary transition-colors">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
