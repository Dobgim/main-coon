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
    title: 'Finding a Reputable Maine Coon Breeder in Evansville, IN',
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
    title: 'Maine Coon Kitten Care Guide for Evansville, IN',
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
  },
  {
    id: '5',
    slug: 'how-much-does-a-maine-coon-kitten-cost',
    title: 'How Much Does a Maine Coon Kitten Cost? 2026 Price Guide',
    date: '2026-11-10',
    author: 'Royal Maine Coon Kittens',
    excerpt: 'A pet-quality Maine Coon kitten from a reputable US breeder usually costs about $1,000 to $2,500. Here is what drives the price, what is included, and how to avoid scams.',
    content: `
      <h2>The short answer</h2>
      <p>In the United States, a pet-quality Maine Coon kitten from a reputable, health-testing breeder usually costs <strong>about $1,000 to $2,500</strong>. Kittens sold with breeding rights or as show prospects often cost $3,000 or more. Delivery, if you need it, is charged on top.</p>

      <h3>What affects the price of a Maine Coon kitten</h3>
      <ul>
        <li><strong>Health testing of the parents:</strong> DNA tests for HCM, SMA and PKDef, plus veterinary screening, cost the breeder real money and protect you from inherited disease.</li>
        <li><strong>Bloodlines and registration:</strong> kittens from registered, well-documented lines cost more than kittens without papers.</li>
        <li><strong>Pet versus breeding rights:</strong> pet kittens are sold to be spayed or neutered; breeding rights add significantly to the price.</li>
        <li><strong>Color and type:</strong> sought-after colors and the larger European type can command higher prices.</li>
        <li><strong>What is included:</strong> vaccinations, deworming, microchip, vet exam and a written health guarantee all add value.</li>
      </ul>

      <h3>What should be included in the price</h3>
      <p>At our Evansville, IN cattery, every kitten leaves vet-checked, vaccinated for its age, dewormed, microchipped and litter-trained, with its records, the parents' DNA health results and a written health guarantee. Each kitten's current price is shown on its page on our <a href="/cats">Available Kittens</a> page.</p>

      <h3>Extra costs to budget for</h3>
      <ul>
        <li><strong>Delivery:</strong> local delivery or a pet courier or flight nanny for longer distances, priced by distance. Collecting in person avoids this.</li>
        <li><strong>First vet visit:</strong> a wellness exam within 72 hours of arrival.</li>
        <li><strong>Supplies:</strong> an extra-large litter box, a sturdy cat tree, grooming tools, carrier and food. See our <a href="/blog/maine-coon-kitten-checklist">new kitten checklist</a>.</li>
      </ul>

      <h3>Why a very cheap Maine Coon is a red flag</h3>
      <p>Listings for "purebred" Maine Coon kittens at $400 to $600, especially with no address, no visit and payment by gift card, are very often scams or kittens from untested parents. A real breeder gives you a verifiable address, lets you meet the kitten in person or on video, and puts its health guarantee in writing. Read more in <a href="/blog/finding-reputable-maine-coon-breeder-evansville-in">how to find a reputable breeder</a>.</p>
    `,
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1400&q=70',
    published: true,
  },
  {
    id: '6',
    slug: 'male-vs-female-maine-coon',
    title: 'Male vs Female Maine Coon: Which Should You Choose?',
    date: '2026-11-10',
    author: 'Royal Maine Coon Kittens',
    excerpt: 'Male Maine Coons are bigger and often described as goofier; females are smaller and often more independent. Here is how size, temperament and cost compare.',
    content: `
      <h2>The short answer</h2>
      <p>Male Maine Coons are noticeably larger, typically 15 to 25 pounds, and are often described as laid-back and clownish. Females are usually 10 to 15 pounds and are often described as a little more independent and dignified. Both make loving companions once spayed or neutered, and individual personality matters more than sex.</p>

      <h3>Size</h3>
      <p>The size difference is the most reliable one. Males grow larger and heavier and keep growing until 3 to 5 years old. If you want the classic gentle giant, a male is the more likely choice. See our <a href="/blog/how-big-do-maine-coons-get">Maine Coon growth guide</a>.</p>

      <h3>Temperament</h3>
      <ul>
        <li><strong>Males:</strong> frequently described as playful, goofy and eager for attention throughout the day.</li>
        <li><strong>Females:</strong> frequently described as affectionate on their own terms, observant and sometimes more reserved with strangers.</li>
      </ul>
      <p>These are tendencies, not rules. A kitten's temperament is shaped by its parents and how it is raised, which is why we raise our kittens in the home and describe each kitten's personality on its page.</p>

      <h3>Health and behavior</h3>
      <p>Spaying or neutering removes most sex-related behavior such as spraying or calling. Large males benefit from careful weight management and joint-friendly nutrition as they grow.</p>

      <h3>How to choose</h3>
      <p>Choose the individual, not the sex. Tell us about your household, children and other pets, and we will suggest kittens whose temperament fits. Browse our <a href="/cats">available kittens</a> or <a href="/contact">contact us</a> for advice.</p>
    `,
    image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=1400&q=70',
    published: true,
  },
  {
    id: '7',
    slug: 'how-to-tell-if-a-kitten-is-a-purebred-maine-coon',
    title: 'How to Tell if a Kitten Is a Purebred Maine Coon',
    date: '2026-11-10',
    author: 'Royal Maine Coon Kittens',
    excerpt: 'Looks alone cannot prove a kitten is a purebred Maine Coon. Registration papers, the parents, and health testing can. Here is what to check before you buy.',
    content: `
      <h2>The short answer</h2>
      <p>The only reliable proof that a kitten is a purebred Maine Coon is <strong>paperwork</strong>: registration of the kitten or its litter with a cat registry such as TICA or CFA, registered parents, and a pedigree. Physical traits help, but many long-haired domestic cats look similar.</p>

      <h3>Maine Coon traits to look for</h3>
      <ul>
        <li>Large, rectangular, muscular body and big boned legs</li>
        <li>Tall ears with lynx-like tufts on the tips and fur inside the ears</li>
        <li>A square muzzle and high cheekbones</li>
        <li>A shaggy, water-resistant coat that is shorter on the shoulders and longer on the belly and britches, often with a ruff</li>
        <li>A long, bushy tail and tufted, snowshoe-like paws</li>
      </ul>

      <h3>Documents to ask the breeder for</h3>
      <ul>
        <li>Registration papers for the parents and the litter</li>
        <li>DNA health results for both parents, including HCM, SMA and PKDef</li>
        <li>The kitten's veterinary records and microchip number</li>
        <li>A written sales contract and health guarantee</li>
      </ul>

      <h3>Red flags</h3>
      <ul>
        <li>No papers, or papers promised "later"</li>
        <li>You cannot see the mother or the kitten in person or on video</li>
        <li>The price is far below the market; see our <a href="/blog/how-much-does-a-maine-coon-kitten-cost">Maine Coon price guide</a></li>
        <li>Pressure to pay immediately by gift card or wire transfer</li>
      </ul>
      <p>We welcome visits by appointment at 219 S Grand Ave, Evansville, IN, and video calls for buyers further away. See the kittens <a href="/cats">available now</a>.</p>
    `,
    image: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1400&q=70',
    published: true,
  },
  {
    id: '8',
    slug: 'are-maine-coons-hypoallergenic',
    title: 'Are Maine Coons Hypoallergenic? Allergy Facts for Owners',
    date: '2026-11-10',
    author: 'Royal Maine Coon Kittens',
    excerpt: 'No, Maine Coons are not hypoallergenic. No cat breed is. Here is why, and practical steps that help some people with mild cat allergies live with one.',
    content: `
      <h2>The short answer</h2>
      <p><strong>No.</strong> Maine Coons are not hypoallergenic, and no cat breed is completely allergen-free. Most cat allergies are triggered by a protein called Fel d 1, found in cat saliva and skin, which all cats produce. A long-haired cat like the Maine Coon can spread more of it around the home when it sheds.</p>

      <h3>Before you commit</h3>
      <ul>
        <li>Spend time with Maine Coons before you buy. Ask to visit and handle the kittens and adults.</li>
        <li>Talk to an allergist, especially if anyone in the home has asthma.</li>
      </ul>

      <h3>Steps that can help with mild allergies</h3>
      <ul>
        <li>Brush your cat regularly, ideally done by someone without allergies. See our <a href="/blog/maine-coon-grooming-tips">grooming guide</a>.</li>
        <li>Run a HEPA air purifier and vacuum with a HEPA filter.</li>
        <li>Keep the cat out of the bedroom and wash bedding often.</li>
        <li>Wash your hands after handling the cat.</li>
      </ul>

      <h3>The bottom line</h3>
      <p>If you have a severe cat allergy, a Maine Coon is not a safe choice. If your allergy is mild, a visit to our Evansville, IN cattery is the best way to find out how you react before you <a href="/cats">reserve a kitten</a>.</p>
    `,
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1400&q=70',
    published: true,
  },
  {
    id: '9',
    slug: 'are-maine-coons-good-family-pets',
    title: 'Are Maine Coons Good Family Pets? Kids, Dogs and Other Cats',
    date: '2026-11-10',
    author: 'Royal Maine Coon Kittens',
    excerpt: 'Maine Coons are among the best cat breeds for families: gentle, sociable and patient with children and cat-friendly dogs. Here is what to expect.',
    content: `
      <h2>The short answer</h2>
      <p>Yes. Maine Coons are widely considered one of the best cat breeds for families. They are gentle, sociable and patient, usually enjoy being around people, and often get along well with children, other cats and cat-friendly dogs.</p>

      <h3>With children</h3>
      <p>Their size and easygoing nature make Maine Coons tolerant of family life. Teach children to pick up a heavy cat with two hands, supporting the back legs, and supervise toddlers until they learn gentle handling.</p>

      <h3>With dogs and other cats</h3>
      <p>Maine Coons are confident and adaptable, so they often live happily with other pets. Introduce them gradually, give the kitten a safe room at first, and provide high perches where it can retreat.</p>

      <h3>What they need from you</h3>
      <ul>
        <li>Daily play and interaction; they are often called the dogs of the cat world</li>
        <li>Sturdy, tall scratching posts and cat trees built for a large cat</li>
        <li>Regular brushing for their long coat</li>
        <li>Company; they do best in homes where someone is around for part of the day</li>
      </ul>

      <h3>Choosing the right kitten for your family</h3>
      <p>Every kitten's page on our site lists whether it is good with children, cats and dogs. Browse <a href="/cats">available kittens</a>, or if you live nearby in <a href="/maine-coon-kittens/evansville-in">Evansville</a> or <a href="/maine-coon-kittens/henderson-ky">Henderson</a>, bring the family to meet them.</p>
    `,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1400&q=70',
    published: true,
  },
  {
    id: '10',
    slug: 'maine-coon-kitten-checklist',
    title: 'Maine Coon Kitten Checklist: What to Buy Before Pickup',
    date: '2026-11-10',
    author: 'Royal Maine Coon Kittens',
    excerpt: 'Everything to have ready before your Maine Coon kitten comes home, sized for a cat that may reach 20 pounds, plus a first-week plan.',
    content: `
      <h2>Before your kitten comes home</h2>
      <p>Maine Coons grow into very large cats, so buy supplies sized for the adult, not the kitten. Here is our checklist for families collecting from our Evansville, IN cattery or receiving a delivery.</p>

      <h3>Essentials</h3>
      <ul>
        <li><strong>Extra-large litter box</strong> and unscented clumping litter</li>
        <li><strong>Large, sturdy carrier</strong> for pickup day and vet visits</li>
        <li><strong>The same kitten food we feed</strong>; we send a starter supply so you can switch gradually if you wish</li>
        <li><strong>Wide ceramic or stainless steel bowls</strong> and a water fountain</li>
        <li><strong>Tall, heavy cat tree and scratching posts</strong> that will not tip under a large cat</li>
        <li><strong>Grooming tools:</strong> a steel comb and a slicker brush</li>
        <li><strong>Toys</strong> such as wand toys and puzzle feeders</li>
      </ul>

      <h3>Kitten-proof your home</h3>
      <ul>
        <li>Secure blind cords and loose cables</li>
        <li>Put away toxic plants, especially lilies</li>
        <li>Keep toilet lids, washers and dryers closed</li>
      </ul>

      <h3>Your first week</h3>
      <ul>
        <li>Start your kitten in one quiet room, then expand its space over a few days.</li>
        <li>Book a vet exam within 72 hours of arrival; this is part of our health guarantee.</li>
        <li>Keep the same food and routine at first to avoid stomach upsets.</li>
        <li>Begin gentle brushing sessions early so grooming becomes routine.</li>
      </ul>
      <p>Ready to choose your kitten? See the <a href="/cats">kittens available now</a>, or read our <a href="/blog/maine-coon-kitten-adoption-care-guide-indiana">care guide for Indiana and Kentucky families</a>.</p>
    `,
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1400&q=70',
    published: true,
  }
];
