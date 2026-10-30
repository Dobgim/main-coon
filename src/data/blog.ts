export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
  published: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'how-big-do-maine-coons-get',
    title: 'How Big Do Maine Coon Cats Get? A Growth Guide',
    date: '2023-10-15',
    author: 'Royal Maine Coon Kittens',
    excerpt: 'Maine Coons are known as gentle giants. Learn exactly how big you can expect your kitten to grow, when they stop growing, and how to support their healthy development.',
    content: `
      <h2>The Gentle Giants of the Cat World</h2>
      <p>Maine Coons are famously one of the largest domesticated cat breeds. While a typical domestic cat might weigh 8-10 pounds, a healthy Maine Coon can easily double that.</p>
      
      <h3>Average Weights and Sizes</h3>
      <p>Male Maine Coons typically weigh between 15 and 25 pounds (6.8 - 11.3 kg), while females are slightly smaller, usually weighing between 10 and 15 pounds (4.5 - 6.8 kg). In terms of length, they can stretch up to 40 inches from nose to tail tip!</p>
      
      <h3>The Growth Timeline</h3>
      <p>Unlike most cat breeds that reach their full size by one year of age, Maine Coons are slow growers. They typically don't reach their full physical maturity until they are 3 to 5 years old. This means you will have a growing kitten on your hands for a very long time!</p>
      
      <h3>Diet and Nutrition for Big Cats</h3>
      <p>Because of their prolonged growth period, it is essential to feed them high-quality kitten food longer than you would a normal cat. Always consult your vet, but many breeders recommend keeping Maine Coons on kitten-specific formulas for up to 18-24 months to support their bone and muscle development.</p>
    `,
    image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=1400&q=70',
    published: true,
  },
  {
    id: '2',
    slug: 'maine-coon-grooming-tips',
    title: 'Essential Grooming Tips for Your Maine Coon',
    date: '2023-11-02',
    author: 'Royal Maine Coon Kittens',
    excerpt: 'Their luxurious coats are beautiful, but they require maintenance. Discover the best tools and routines to keep your Maine Coon looking majestic and mat-free.',
    content: `
      <h2>Maintaining That Majestic Coat</h2>
      <p>One of the most striking features of a Maine Coon is their shaggy, water-resistant coat. While they are generally good at grooming themselves, their long fur means they need a little help from their human companions to prevent mats and reduce shedding.</p>
      
      <h3>Brushing Routine</h3>
      <p>You should aim to brush your Maine Coon at least twice a week. During shedding seasons (Spring and Fall), you may need to increase this to daily brushing. Start grooming them when they are kittens so they get used to the process and learn to enjoy it as bonding time.</p>
      
      <h3>The Best Tools</h3>
      <ul>
        <li><strong>Steel Greyhound Comb:</strong> Essential for getting down to the skin and finding tangles before they turn into mats.</li>
        <li><strong>Slicker Brush:</strong> Great for removing loose topcoat hair and making the fur look fluffy.</li>
        <li><strong>Undercoat Rake:</strong> Useful during shedding season to thin out the dense undercoat.</li>
      </ul>
      
      <h3>Dealing with Mats</h3>
      <p>If you find a mat, do not try to pull it out with a brush. Gently tease it apart with your fingers or a wide-toothed comb. If it's too tight, you may need to use blunt-nosed scissors to carefully cut it out, or visit a professional groomer.</p>
    `,
    image: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1400&q=70',
    published: true,
  },
  {
    id: '3',
    slug: 'finding-reputable-maine-coon-breeder-evansville-in',
    title: 'Finding a Reputable Maine Coon Breeder in Evansville, IN & The Tri-State',
    date: '2024-03-12',
    author: 'Royal Maine Coon Kittens',
    excerpt: 'Looking for a Maine Coon kitten in Evansville, Indiana or surrounding areas like Newburgh, Henderson KY, and Owensboro? Here is what to verify before reserving your kitten.',
    content: `
      <h2>Choosing the Right Maine Coon Cattery in Southwestern Indiana</h2>
      <p>Maine Coons are one of the most sought-after companion breeds in North America thanks to their majestic size, lynx ear tips, and affectionate dog-like disposition. If you are searching for a Maine Coon kitten in Evansville, IN (47713) or across the Tri-State area—including Newburgh, Henderson KY, Owensboro KY, and Jasper—choosing an ethical, transparent breeder is crucial.</p>
      
      <h3>1. Genetic Health Screening: Non-Negotiable</h3>
      <p>Ethical Maine Coon breeding starts with comprehensive DNA testing of the parent cats. Responsible breeders test both kings and queens for hereditary conditions specific to the breed:</p>
      <ul>
        <li><strong>Hypertrophic Cardiomyopathy (HCM):</strong> The leading heart disease in large feline breeds.</li>
        <li><strong>Spinal Muscular Atrophy (SMA):</strong> A motor neuron disorder that affects posture and gait.</li>
        <li><strong>Pyruvate Kinase Deficiency (PKDef):</strong> An inherited hemolytic anemia.</li>
      </ul>
      <p>At our Evansville cattery located at 219 S Grand Ave, every kitten is backed by parent DNA health certificates and a comprehensive written health guarantee.</p>

      <h3>2. Cage-Free, Home-Raised Socialization</h3>
      <p>A kitten raised in a cage or outdoor shed will struggle to adapt to lively family life. Gentle giants need early neurological stimulation and constant exposure to household noises, vacuum cleaners, children, and regular petting. When you visit our Evansville cattery at 219 S Grand Ave by appointment, you can see firsthand that our kittens are raised underfoot with constant love and attention.</p>

      <h3>3. Local In-Person Pickup vs. Safe Courier Delivery</h3>
      <p>For families in Vanderburgh County, Warrick County, or just across the Ohio River in Henderson and Owensboro, having a local cattery allows you to meet your kitten in person on pickup day. For adopters farther away in Indianapolis, Louisville, or out of state, reputable breeders arrange direct, climate-controlled pet courier transport or in-cabin flight nannies—never cargo shipment.</p>

      <h3>4. Beware of Online Kitten Scams</h3>
      <p>Unfortunately, low-price Maine Coon listings on social media ($400-$600) with stolen photos are almost always fraudulent. A legitimate purebred Maine Coon cattery provides verifiable veterinary records, microchipping documentation, verifiable local address details, and transparent communication.</p>
    `,
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1400&q=70',
    published: true,
  },
  {
    id: '4',
    slug: 'maine-coon-kitten-adoption-care-guide-indiana',
    title: 'Maine Coon Kitten Adoption & Care: Evansville, IN Local Guide',
    date: '2024-05-18',
    author: 'Royal Maine Coon Kittens',
    excerpt: 'A complete guide for Indiana and Kentucky families welcoming a Maine Coon kitten. Learn about climate care, local veterinary readiness, and nutritional needs.',
    content: `
      <h2>Welcoming a Maine Coon to Your Midwest Home</h2>
      <p>Bringing a Maine Coon kitten into your home in Evansville, Indiana, or neighboring Kentucky communities is an unforgettable experience. However, caring for a breed that can reach 20+ pounds requires thoughtful preparation.</p>

      <h3>Midwest Climate & Coat Management</h3>
      <p>The Ohio River Valley experiences humid summers and chilly winters. Maine Coons possess a water-resistant, semi-long double coat that adapts remarkably well, but seasonal shedding requires attention:</p>
      <ul>
        <li><strong>Spring Shedding:</strong> As temperatures rise in Evansville, brush daily with an undercoat rake to prevent heavy matting behind the ears and in the "britches" (rear legs).</li>
        <li><strong>Winter Dryness:</strong> Cold Midwest winters with indoor heating can cause dry skin. Ensure your kitten has fresh water from a circulating fountain and consider Omega-3 fish oil supplements.</li>
      </ul>

      <h3>Nutrition for Slow-Growing Giants</h3>
      <p>Because Maine Coons take 3 to 5 years to reach their full structural size, high-protein kitten food is recommended for up to 18 to 24 months. Proper calcium-to-phosphorus ratios support healthy bone density and joint cartilage as their heavy frames develop.</p>

      <h3>Local Evansville Veterinary Care</h3>
      <p>Before bringing your kitten home from our cattery at 219 S Grand Ave, Evansville, IN 47713, schedule an initial wellness check with your local veterinarian in Vanderburgh or Warrick County within 72 hours. This activates your health guarantee and establishes a baseline health profile.</p>

      <h3>Pickup & Delivery Services</h3>
      <p>Whether you reside in Evansville (47713), Newburgh, Henderson KY, Owensboro KY, or are traveling via Evansville Regional Airport (EVV), our team is dedicated to making adoption day smooth, transparent, and joyful.</p>
    `,
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1400&q=70',
    published: true,
  }
];
