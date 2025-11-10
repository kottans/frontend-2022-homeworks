const data = {
  breed: {
    sections: [
      {
        title: 'Short history',
        items: [
          'Bengals are a hybrid cat breed. In the early 1900s, breeders crossed domestic felines with Asian ' +
          'leopard cats, a small, wild species native to Southeast Asia. Asian leopard cats — also known as Felis ' +
          'bengalensis, which is where “Bengal” comes from — are known for having a slender build and wild appearance.',

          'While the breed crossings began more than 120 years ago, the actual Bengal species wasn\'t established until ' +
          'the 1970s when Jean Sugden Mill bred the Asian leopard cat hybrids with domestic cat breeds. Her goal was ' +
          'to produce a breed that stayed true to the exotic appearance of the Asian leopard cat, with the personality ' +
          'of a domestic house cat.'
        ]
      },
    ]
  },
  temperament: {
    sections: [
      {
        title: 'Wild but affectionate',
        items: [
          'Despite how wild a Bengal looks on the outside, he\'s soft and sweet on the inside. These affectionate cats ' +
          'are gregarious, although they might christen a particular family member as their favorite. Bengals do great ' +
          'with children, other cats, and with family dogs. The key, however, is early socialization and exposure to ' +
          'household members at a young age. If you try to introduce a new pet to older Bengals already set in their ' +
          'ways, you might have a challenge on your hands.',

          'Because Bengals are an intelligent and curious breed, they need constant stimulation to keep their big brains ' +
          'engaged. They love playing with toys and are also known to love water and enjoy a shallow tub. Bengals can be' +
          ' taught tricks and even how to walk on a leash for outdoor adventures.'
        ]
      }
    ]
  },
  appearance: {
    sections: [
      {
        title: 'Markings',
        items: [
          'Bengals are known for their jungle cat looks and iconic markings.Their muscular bodies and long hind legs give them a powerful stride, and their sleek coats and round-tipped ears are a direct reflection of their wild ancestors. While their leopard-like appearance is a standard trait of the breed, Bengals can have ' +
          'variations when it comes to coat color and eye color.'
        ]
      },
      {
        title: 'Key characteristics',
        items: [
          'Males medium to large 4.5 to 8.1 kg; Females 2.7 to 5.4 kg. Most Bengals have green, yellow or gold eyes. ' +
          'The lynx points have blue eyes, and the minks have aqua eyes.Bengals are long and lean and athletic in ' +
          'appearance. Bengals are larger than the average house cat because of their muscular bodies. Bengal kittens ' +
          'range between $3,000 and $5,000. Adult Bengal cats range between $700 and $1500.'
        ]
      }
    ]
  },
  health: {
    sections: [
      {
        title: 'Health ',
        items: [
          'The typical Bengal cat lifespan is 9–15 years, and they\'re a relatively healthy breed. However, as with all' +
          ' cats, they do have a few health issues you need to keep in mind before you purchase a new pet. Most serious ' +
          'breeders are careful to breed animals without genetic health problems, but three of the most common maladies' +
          ' among Bengals are:'
        ]
      },
      {
        title: 'Heart disease:',
        items: [
          'Heart disease in Bengal cats is called hypertrophic cardiomyopathy, which can cause the heart muscle to ' +
          'thicken, particularly in older animals. This can result in blood clots or congestive heart failure and a ' +
          'shorter lifespan. '
        ]
      },
      {
        title: 'Eye disease:',
        items: [
          'Bengals can also get an eye condition called progressive retinal atrophy, which can cause deterioration of ' +
          'the retina and eventual blindness.'
        ]
      },
      {
        title: 'Anesthetic allergies:',
        items: [
          'Bengals can be extremely sensitive to anesthetics and should be watched carefully during any surgeries—including ' +
          'neutering and spaying. An allergic reaction to anesthetics can result in cardiac arrest.'
        ]
      }
    ]
    
  },
  facts: {
    sections: [
      {
        title: 'Chatty and vocal',
        items: [
          "Bengal cats are also known to be a bit chatty with their owners. They won't meow excessively, but they're " +
          "pros at telling you exactly what they need, especially if it's \"my food bowl is almost empty,\" or \"I want " +
          "to play.\" A Bengal also won't sit idly by after you come home from a long day at work. You can expect a " +
          "royal greeting, complete with a serenade."
        ],
      },
    ]
  },
}

document.getElementById('menu').addEventListener('click', (e) => {
  const menuId = e.target.dataset.id;
  const { sections } = data[menuId];

  const pageSectionsHtml = sections.map(({title, items}) => {
    const titleHtml = title ? `<h3>${title}</h3>` : '';
    const textHtml = items.map((text) => `<p>${text}</p>`).join('');

    return `${titleHtml}${textHtml}`
  }).join('');


  const contentElement = document.getElementById('content');
  contentElement.innerHTML = pageSectionsHtml;
});
