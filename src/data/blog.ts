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
  }
];
