import {
  Award,
  Camera,
  Code,
  Code2Icon,
  HeartHandshake,
  Mic,
  Paintbrush,
  Star,
  Zap,
} from 'lucide-react';
import { FaMoneyCheck } from 'react-icons/fa';

export const teams = [
  {
    category: 'Faculty',
    id: 'faculty',
    path: '/team/faculty',
    icon: <HeartHandshake className="text-yellow-200" />,
    members: [
      {
        name: 'Dr. Anirban Mukherjee',
        role: 'Principal , RCCIIT',
        image: 'https://i.postimg.cc/YqTPnYYp/image.png',
      },
      {
        name: 'Mr. Sandip Saha',
        role: 'Registrar, RCCIIT',
        image:
          'https://i.postimg.cc/7Lqz5NTr/WhatsApp_Image_2024-05-06_at_00.54.21_e51a6ee6.jpg',
      },
      {
        name: 'Mr. Pradip Kumar Das',
        role: 'Deputy Registrar, RCCIIT',
        image:
          'https://i.postimg.cc/N0FVvRfB/WhatsApp_Image_2024-05-06_at_00.41.14_5e8d2db7.jpg',
      },
      {
        name: 'Mr. Sarbojit Mukherjee',
        role: 'Faculty In-Charge (SA & SW) & Sports',
        image:
          'https://i.postimg.cc/VvD2ngKr/Whats-App-Image-2025-04-27-at-09-25-34-03d51234.jpg',
      },
      {
        name: 'Mr. Rajib Saha',
        role: 'Faculty Coordinator (Technical)',
        image:
          'https://i.postimg.cc/nrJFqwRV/d45a6a91-8afa-4e51-983b-963301a16cd4.jpg',
      },
      {
        name: 'Dr. Abhijit Das',
        role: 'Faculty Advisor (Cultural)',
        image: 'https://i.postimg.cc/rstgySy7/abhijit.jpg',
      },
    ],
  },
  //SWC team completed
  {
    category: 'SWC',
    id: 'swc',
    path: '/team/swc',
    icon: <Award className="text-yellow-200" />,
    members: [
      {
        name: 'Sreya Sahoo',
        role: 'SWC Core Organizer',
        image: 'https://i.postimg.cc/MKJR9GHC/image.png',
      },
      {
        name: 'Tuhin Ghosh',
        role: 'SWC Core Organizer',
        image: 'https://i.postimg.cc/BZ1B7626/image.png',
      },
      {
        name: 'Soumyaraj Bag',
        role: 'SWC Core Organizer',
        image: 'https://i.postimg.cc/5NNyXmLV/image.png',
      },

      {
        name: 'Ariyan Bhakat',
        role: 'SWC Core Organizer',
        image: 'https://i.postimg.cc/yxqcCm0s/image.png',
      },
      {
        name: 'Shreya Dutta',
        role: 'SWC Core Organizer',
        image:
          'https://i.postimg.cc/pThyLVF9/IMG_20251208_WA0233_SHREYA_DUTTA.jpg',
      },
      {
        name: 'Tiyasa Raptan',
        role: 'SWC Core Organizer',
        image:
          'https://i.postimg.cc/yNrkK3Wf/IMG_20250921_WA0152_TIYASA_RAPTAN.jpg',
      },
      {
        name: 'Hirak Sabui',
        role: 'SWC Core Organizer',
        image:
          'https://i.postimg.cc/hjzht4d4/IMG_20251114_WA0212(1)_HIRAK_SABUI.jpg',
      },
      {
        name: 'Shreya Sen',
        role: 'SWC Core Organizer',
        image: 'https://i.postimg.cc/Twz1L8Vb/IMG20251001211742_SHREYA_SEN.jpg',
      },
      {
        name: 'Anushka Aryan',
        role: 'SWC Core Organizer',
        image:
          'https://i.postimg.cc/VvX6X7gG/In_Shot_20251225_112116517_ANUSHKA_ARYAN.jpg',
      },
      {
        name: 'Pratik Chowdhury',
        role: 'SWC Core Organizer',
        image:
          'https://i.postimg.cc/cHpCgqRV/In_Shot_20240904_215630026_PRATIK_CHOWDHURY.jpg',
      },
      {
        name: 'Swapnendu Banerjee',
        role: 'SWC Core Organizer',
        image: 'https://i.postimg.cc/9F3mTR00/image.png',
      },
      {
        name: 'Sagnik Datta',
        role: 'SWC Core Organizer',
        image: 'https://i.postimg.cc/ry4c8VjF/image.png',
      },
    ],
  },
  //convener team picture done
  {
    category: 'Convenors',
    id: 'convenors',
    path: '/team/convenors',
    icon: <Star className="text-yellow-200" />,
    members: [
      {
        name: 'Sreya Sahoo',
        role: 'Kabaddi (FEMALE)',
        image: 'https://i.postimg.cc/MKJR9GHC/image.png',
      },
      {
        name: 'NISHANT KUMAR ROY',
        role: 'Kabaddi (MALE)',
        image:
          'https://i.postimg.cc/y6RkqdKn/SAVE_20251225_190017_NISHANT_KUMAR_ROY.jpg',
      },
      {
        name: 'Anushka Ghosh',
        role: 'Badminton (FEMALE)',
        image:
          'https://i.postimg.cc/7Pzfv64c/Screenshot_20251225_134148_(1)_ANUSHKA_GHOSH.png',
      },
      {
        name: 'Pratik Chowdhury',
        role: 'Badminton (MALE)',
        image:
          'https://i.postimg.cc/cHpCgqRV/In_Shot_20240904_215630026_PRATIK_CHOWDHURY.jpg',
      },
      {
        name: 'Pritam Majumdar',
        role: 'Carrom',
        image: 'https://i.postimg.cc/zBNRDtWN/image.png',
      },
      {
        name: 'Parthib Ghoshdastidar',
        role: 'Chess',
        image:
          'https://i.postimg.cc/dtMZDCnw/IMG_4715_PARTHIB_GHOSHDASTIDAR.jpg',
      },

      {
        name: 'Anushka Aryan',
        role: 'Tug of War (FEMALE)',
        image:
          'https://i.postimg.cc/VvX6X7gG/In_Shot_20251225_112116517_ANUSHKA_ARYAN.jpg',
      },
      {
        name: 'Shreya Dutta',
        role: 'Track & Sports',
        image:
          'https://i.postimg.cc/pThyLVF9/IMG_20251208_WA0233_SHREYA_DUTTA.jpg',
      },
      {
        name: 'Soumyaraj Bag',
        role: 'Track & Sports',
        image: 'https://i.postimg.cc/5NNyXmLV/image.png',
      },
    ],
  },
  {
    category: 'Coordinators',
    id: 'coordinators',
    path: '/team/coordinators',
    icon: <Star className="text-yellow-200" />,
    members: [
      {
        name: 'Soumik Bag',
        role: 'Short Hand Cricket',
        image:
          'https://i.postimg.cc/HnbxbSzN/In-Shot-20250928-003052478-SOUMIK-BAG.jpg',
      },
      {
        name: 'Sekh Motier Rahaman ',
        role: 'Short Hand Cricket',
        image:
          'https://i.postimg.cc/dV6hWxYf/IMG-20251225-104959-SEKH-MOTIER-RAHAMAN.jpg',
      },

      {
        name: 'Kanchan Debnath',
        role: 'Football',
        image:
          'https://i.postimg.cc/pLR9JtwR/IMG-20251225-105745-KANCHAN-DEBNATH.jpg',
      },
      {
        name: 'Ankit Tewary',
        role: 'Football',
        image:
          'https://i.postimg.cc/wj21WGzd/IMG-20251225-112110-ANKIT-TEWARY(1).jpg',
      },
      {
        name: 'Bidisha Das',
        role: 'Handball',
        image:
          'https://i.postimg.cc/KYsRb34w/IMG-20250413-WA0111-BIDISHA-DAS.jpg',
      },

      {
        name: 'Sneha Halder',
        role: 'Kabaddi (FEMALE)',
        image:
          'https://i.postimg.cc/CK6z0nds/IMG-20250331-WA0051-(1)-SNEHA-HALDER(1).jpg',
      },
      {
        name: 'Shree Kant Pathak',
        role: 'Kabaddi (MALE)',
        image:
          'https://i.postimg.cc/cHg6L1nN/IMG-20251021-WA0043-SHREE-KANT-PATHAK.jpg',
      },
      {
        name: 'Akash Raut',
        role: 'Kabaddi (MALE)',
        image:
          'https://i.postimg.cc/wjgtQdSn/IMG-20251102-084841-538-AKASH-RAUT.webp',
      },
      {
        name: 'Sohom Sarkar',
        role: 'Tug of War (MALE)',
        image:
          'https://i.postimg.cc/Mp5nsFwQ/IMG_20251226_014922_SOHOM_SARKAR(1).jpg',
      },
      {
        name: 'Poulami Saha',
        role: 'Tug of War (FEMALE)',
        image:
          'https://i.postimg.cc/P5TLQkgG/IMG-20251218-184922-POULAMI-SAHA(1).jpg',
      },
      {
        name: 'SOMSUBHRA MISRA',
        role: 'Carrom',
        image:
          'https://i.postimg.cc/L89XZ3P4/c9c96efb-78d5-44cd-992f-d1659a8fa700-SOMSUBHRA-MISRA.jpg',
      },

      {
        name: 'Aditya Chakraborty',
        role: 'Badminton (MALE)',
        image: 'https://i.postimg.cc/fR8b7S7f/IMG-1251-ADITYA-CHAKRABORTY.jpg',
      },
      {
        name: 'Pujan Dutta',
        role: 'Badminton (MALE)',
        image:
          'https://i.postimg.cc/kMSBr4CK/Pi7-Passport-Photo-PUJAN-DUTTA(1).jpg',
      },

      {
        name: 'AATREYEE MISRA',
        role: 'Badminton (FEMALE)',
        image: 'https://i.postimg.cc/dV50RZRt/id-card-AATREYEE-MISRA.jpg',
      },

      {
        name: 'ARIJIT SAHA',
        role: 'Table Tennis',
        image:
          'https://i.postimg.cc/5tt6DS9n/IMG-20241211-WA0167(3)-ARIJIT-SAHA(1).jpg',
      },
      {
        name: 'Subhayan Basak',
        role: 'Table Tennis',
        image: 'https://i.postimg.cc/sgf6xmY4/image.png',
      },
      {
        name: 'Supriti Ghosh',
        role: 'Track & Sports',
        image:
          'https://i.postimg.cc/B6rbLWTL/IMG-20251225-WA0284-Supriti-Ghosh.jpg',
      },
      {
        name: 'Sharmistha Ghosh',
        role: 'Track & Sports',
        image: 'https://i.postimg.cc/2SVW09hM/image.png',
      },
      {
        name: 'Antara Malik',
        role: 'Track & Sports',
        image:
          'https://i.postimg.cc/kMSBr4C1/Screenshot-2025-12-25-214847-ANTARA-MALIK.png',
      },
      {
        name: 'Neel Bose',
        role: 'Track & Sports',
        image:
          'https://i.postimg.cc/8kvj85G2/Snapchat-1901994285(1)-NEEL-BOSE(2).jpg',
      },
      {
        name: 'Soumyadeep Sardar',
        role: 'Track & Sports',
        image: 'https://i.postimg.cc/0yVNGKGQ/IMG_0275_SOUMYADEEP_SARDAR.jpg',
      },
    ],
  },
  // {
  //   category: 'Volunteers',
  //   id: 'volunteers',
  //   path: '/team/volunteers',
  //   icon: <Star className="text-yellow-200" />,
  //   members: [
  //     {
  //       name: 'Anubhab Das',
  //       role: 'Band Bash',
  //       image:
  //         'https://i.postimg.cc/yxVcKdZs/Whats-App-Image-2025-05-09-at-20-08-24-b67912e4.jpg',
  //     },
  //     {
  //       name: 'Supratim Sen',
  //       role: 'Band Bash',
  //       image:
  //         'https://i.postimg.cc/SsKYc4X2/IMG-20250503-162323-SUPRATIM-SEN.jpg',
  //     },
  //     {
  //       name: 'Aatreyee Misra',
  //       role: 'Carpe Diem',
  //       image:
  //         'https://i.postimg.cc/j5vQrvfN/e2b0320ab9d7439ebf158e87668f91ef-AATREYEE-MISRA.jpg',
  //     },
  //     {
  //       name: 'Bidisha Das',
  //       role: 'Carpe Diem',
  //       image:
  //         'https://i.postimg.cc/j2X8J8N4/Whats-App-Image-2025-05-09-at-14-12-52-9644c484.jpg',
  //     },
  //     {
  //       name: 'Omi Dhir',
  //       role: 'Kashish-E-Haya',
  //       image: 'https://i.postimg.cc/MGSyMgbV/IMG-20250223-205826-OMI-DHIR.jpg',
  //     },

  //     {
  //       name: 'Kanchan Debanth',
  //       role: 'Wall of Wonders',
  //       image:
  //         'https://i.postimg.cc/jSGM886S/1746168820429-KANCHAN-DEBNATH.jpg',
  //     },
  //     {
  //       name: 'Shubhechha Samanta',
  //       role: 'Nrityam',
  //       image:
  //         'https://i.postimg.cc/m21MdTm7/IMG-20250503-101707-SHUBHECHHA-SAMANTA.jpg',
  //     },
  //     {
  //       name: 'Swapnanil Chakraborty',
  //       role: 'Jhankar',
  //       image:
  //         'https://i.postimg.cc/HnV51mdD/IMG-20250502-073015-SWAPNANIL-CHAKRABORTY.jpg',
  //     },
  //     {
  //       name: 'Meghna Santra',
  //       role: 'Voice of Emotions',
  //       image:
  //         'https://i.postimg.cc/v833R87j/B612-20250403-090420-762-MEGHNA-SANTRA-1.jpg',
  //     },
  //     {
  //       name: 'Saikat Saha',
  //       role: 'Kashish-E-Haya',
  //       image:
  //         'https://i.postimg.cc/QdFHG5Hj/IMG20250109221612-SAIKAT-SAHA.jpg',
  //     },
  //     {
  //       name: 'Swagata Ganguly',
  //       role: 'Voice of Emotions',
  //       image:
  //         'https://i.postimg.cc/fyHT1Ts3/IMG-20250509-WA0074-SWAGATA-GANGULY.jpg',
  //     },
  //     {
  //       name: 'Shuvojyoti Biswas',
  //       role: 'PR & Outreach Team Member',
  //       image:
  //         'https://i.postimg.cc/kXpgc4wz/FB-IMG-1746147121058-SHUVOJYOTI-BISWAS.jpg',
  //     },

  //     {
  //       name: 'Subhradeep Baidya',
  //       role: 'PR & Outreach Team Member',
  //       image: 'https://i.postimg.cc/mDmRrbKq/IMG-8593-Subhradeep-Baidya.jpg',
  //     },
  //     {
  //       name: 'Aditya Chakraborty',
  //       role: 'Logistics Team Member',
  //       image:
  //         'https://i.postimg.cc/rsjNBTZY/IMG-20231128-WA0006-ADITYA-CHAKRABORTY.jpg',
  //     },
  //     {
  //       name: 'DeepMalya Ghosh Dastidar',
  //       role: 'Security Team Member',
  //       image:
  //         'https://i.postimg.cc/BZz1pMWK/IMG-20250425-001838-Deepmalya-Ghosh-Dastider-Official.webp',
  //     },
  //     {
  //       name: 'Soumyadeep Sardar',
  //       role: 'Security Team Member',
  //       image: 'https://i.postimg.cc/fThS1kLz/IMG-2869-SOUMYADEEP-SARDAR.webp',
  //     },
  //     {
  //       name: 'Shree kant pathak ',
  //       role: 'Logistics Team Member',
  //       image:
  //         'https://i.postimg.cc/c4w1ycz2/IMG-20250322-211321-211-SHREE-KANT-PATHAK.webp',
  //     },
  //     {
  //       name: 'Mohit Chowdhury',
  //       role: 'Logistics Team Member',
  //       image: 'https://i.postimg.cc/h4Xxg9zt/IMG-9828-MOHIT-CHOWDHURY.jpg',
  //     },
  //     {
  //       name: 'Sagar Raj Yadav',
  //       role: 'Logistics Team Member',
  //       image:
  //         'https://i.postimg.cc/nr9n5VLn/IMG20240710105920-SAGAR-RAJYADAV.jpg',
  //     },
  //   ],
  // },
  // //tech team completed
  {
    category: 'Tech',
    id: 'tech',
    path: '/team/tech',
    icon: <Code2Icon className="text-yellow-200" />,
    members: [
      {
        name: 'Soumyaraj Bag',
        role: 'Tech Team Lead',
        image: 'https://i.postimg.cc/5NNyXmLV/image.png',
      },
      {
        name: 'Swapnendu Banerjee',
        role: 'Tech Team Co-Lead',
        image: 'https://i.postimg.cc/9F3mTR00/image.png',
      },
      {
        name: 'Sagnik Datta',
        role: 'Tech Team Co-Lead',
        image: 'https://i.postimg.cc/ry4c8VjF/image.png',
      },
      {
        name: 'Palas Saha',
        role: 'AI Lead',
        image: 'https://i.postimg.cc/C1NGDTHZ/image.png',
      },
      {
        name: 'Rupayan Biswas',
        role: 'UI-UX Lead',
        image: 'https://i.postimg.cc/cChFst52/rupayan.png',
      },
      {
        name: 'Anirban Majumder',
        role: 'Tech Team Member',
        image: 'https://i.postimg.cc/T2bp8wGx/solo1-1-ANIRBAN-MAJUMDER.png',
      },
      {
        name: 'Archisha Upadhyaya',
        role: 'Tech Team Member',
        image:
          'https://i.postimg.cc/X7cqJzpJ/20250207_151535_(1)_ARCHISHA_UPADHYAYA.jpg',
      },
      {
        name: 'Soyam Paul',
        role: 'Tech Team Member',
        image:
          'https://i.postimg.cc/vZb1tdph/IMG-20251013-003613-SOYAM-PAUL.jpg',
      },
      {
        name: 'Ankur Bag',
        role: 'Tech Team Member',
        image:
          'https://i.postimg.cc/qM8hK7Z2/IMG-20250907-131059-ANKUR-BAG.jpg',
      },
      {
        name: 'Sohom Roy',
        role: 'Tech Team Member',
        image:
          'https://i.postimg.cc/PfDPGxHV/Screenshot-2025-12-25-210544-Sohom-Roy.png',
      },
      {
        name: 'Aishik Mondal',
        role: 'Tech Team Member',
        image: 'https://i.postimg.cc/63CLY4Vp/image.png',
      },
      {
        name: 'Pearl Queen Ray',
        role: 'Tech Team Member',
        image:
          'https://i.postimg.cc/nh2XdPxn/IMG-20251225-120542-PEARL-QUEEN-RAY.jpg',
      },
      {
        name: 'Nilotpal Guha',
        role: 'Tech Team Member',
        image:
          'https://i.postimg.cc/gchn9JpN/Picsart-25-09-17-00-32-33-937-NILOTPAL-GUHA.jpg',
      },
    ],
  },
  {
    category: 'Graphics',
    id: 'graphics',
    path: '/team/graphics',
    icon: <Paintbrush className="text-yellow-200" />,
    members: [
      {
        name: 'Ariyan Bhakat',
        role: 'Graphics Team Supervisor',
        image:
          'https://i.postimg.cc/7PQ4vR7T/IMG-20250428-WA0003-ARIYAN-BHAKAT.webp',
      },
      {
        name: 'Hirak Sabui',
        role: 'Graphics Team Supervisor',
        image:
          'https://i.postimg.cc/VkNVcR8x/Whats-App-Image-2025-05-09-at-12-08-49-91b2a168.jpg',
      },
      {
        name: 'Sohom Sarkar',
        role: 'Graphics Team Lead',
        image:
          'https://i.postimg.cc/Mp5nsFwQ/IMG_20251226_014922_SOHOM_SARKAR(1).jpg',
      },
      {
        name: 'Sayandeep Sen',
        role: 'Videography Lead',
        image: 'https://i.postimg.cc/mrcgJ1qD/IMG-20250513-WA0107-1.jpg',
      },

      {
        name: 'Soumyajit Samanta',
        role: 'Graphics Team Member',
        image:
          'https://i.postimg.cc/W154mqm4/DOC-20251020-WA0006-page-0001-SOUMYAJIT-SAMANTA.jpg',
      },
      {
        name: 'Diptish De',
        role: 'Graphics Team Member',
        image:
          'https://i.postimg.cc/R0bNmJNV/IMG-20250930-WA0043-DIPTISH-DE.jpg',
      },
      {
        name: 'Bhumika Das',
        role: 'Graphics Team Member',
        image: 'https://i.postimg.cc/0ykQJ0Sq/bhumika_BHUMIKA_DAS.jpg',
      },
      {
        name: 'Anushka Deb',
        role: 'Graphics Team Member',
        image:
          'https://i.postimg.cc/XvDpWBXD/IMG-20250925-WA0059-ANUSHKA-DEB(1).jpg',
      },
      {
        name: 'Niloy Das',
        role: 'Graphics Team Member',
        image:
          'https://i.postimg.cc/RZ43Lzjs/IMG-20251205-100926-068-NILOY-DAS(1).jpg',
      },
      {
        name: 'Poulami Saha',
        role: 'Graphics Team Member',
        image:
          'https://i.postimg.cc/P5TLQkgG/IMG-20251218-184922-POULAMI-SAHA(1).jpg',
      },
      {
        name: 'Shreya Chakraborty',
        role: 'Graphics Team Member',
        image: 'https://i.postimg.cc/jdVnCfcF/IMG-4542-Shreya-Chakraborty.jpg',
      },
    ],
  },
  // // coverage team completed
  // {
  //   category: 'Coverage Team',
  //   id: 'coverage',
  //   path: '/team/coverage',
  //   icon: <Camera className="text-yellow-200" />,
  //   members: [
  //     {
  //       name: 'Sambit Sarkar',
  //       role: 'Coverage Team Lead',
  //       image:
  //         'https://i.postimg.cc/9fCz72NM/IMG-20230318-133918-244-Sambit-Sarkar.jpg',
  //     },
  //     {
  //       name: 'Shinjan Sarkar',
  //       role: 'Coverage Team Member',
  //       image: 'https://i.postimg.cc/HxLx62m1/DSC-1347-Shinjan-Sarkar.jpg',
  //     },
  //     {
  //       name: 'Arghadeep Saha',
  //       role: 'Coverage Team Member',
  //       image:
  //         'https://i.postimg.cc/xTLBhx38/B612-20240120-231801-069-Arghadeep-Saha.jpg',
  //     },
  //     {
  //       name: 'Ritam Kar',
  //       role: 'Coverage Team Member',
  //       image: 'https://i.postimg.cc/zvYYH9km/ritamkar.jpg',
  //     },
  //     {
  //       name: 'Rishav Pramanik',
  //       role: 'Coverage Team Member',
  //       image:
  //         'https://i.postimg.cc/T1z3YvDT/IMG-20241013-WA0036-Rishav-Pramanik.jpg',
  //     },
  //     {
  //       name: 'Shubham Paul',
  //       role: 'Coverage Team Member',
  //       image: 'https://i.postimg.cc/kG65mgDj/DSC-2534-1-Subham-Paul.jpg',
  //     },
  //     {
  //       name: 'Saikat Mondal',
  //       role: 'Coverage Team Member',
  //       image:
  //         'https://i.postimg.cc/cC2rg8Vy/Untitled-design-SAIKAT-MONDAL.jpg',
  //     },
  //     {
  //       name: 'Ranit Sarkar',
  //       role: 'Coverage Team Member',
  //       image:
  //         'https://i.postimg.cc/8z87TMRL/Whats-App-Image-2025-02-22-at-19-04-31-f0b88fad-Texh-Uf.jpg',
  //     },
  //     {
  //       name: 'Soumya Das',
  //       role: 'Coverage Team Member',
  //       image:
  //         'https://i.postimg.cc/Jndhvk7D/PSX-20240308-115804-Soumya-Das.jpg',
  //     },

  //     {
  //       name: 'Nirmalya Karmakar',
  //       role: 'Coverage Team Member',
  //       image: 'https://i.postimg.cc/x11DmGLd/nirmalya.jpg',
  //     },
  //   ],
  // },
  {
    category: 'Social Media',
    id: 'social-media',
    path: '/team/social-media',
    icon: <Mic className="text-yellow-200" />,
    members: [
      {
        name: 'Shreya Sen',
        role: 'Social Media Lead',
        image: 'https://i.postimg.cc/Twz1L8Vb/IMG20251001211742_SHREYA_SEN.jpg',
      },
      {
        name: 'Antara Malik',
        role: 'Social Media Member',
        image:
          'https://i.postimg.cc/kMSBr4C1/Screenshot-2025-12-25-214847-ANTARA-MALIK.png',
      },
    ],
  },
  // //PR team completed
  {
    category: 'PR & Outreach',
    id: 'pr',
    path: '/team/pr',
    icon: <Mic className="text-yellow-200" />,
    members: [
      {
        name: 'Shreya Dutta',
        role: 'PR & Outreach Lead',
        image:
          'https://i.postimg.cc/pThyLVF9/IMG_20251208_WA0233_SHREYA_DUTTA.jpg',
      },
      {
        name: 'Sreya Sahoo',
        role: 'PR & Outreach Lead',
        image: 'https://i.postimg.cc/MKJR9GHC/image.png',
      },
      {
        name: 'Aditya Roy',
        role: 'PR & Outreach Team Member',
        image: 'https://i.postimg.cc/kXFG4pBp/20250925-154618-ADITYA-ROY.jpg',
      },
      {
        name: 'Aditya Chakraborty',
        role: 'PR & Outreach Team Member',
        image: 'https://i.postimg.cc/fR8b7S7f/IMG-1251-ADITYA-CHAKRABORTY.jpg',
      },
      {
        name: 'Bidisha Das',
        role: 'PR & Outreach Team Member',
        image:
          'https://i.postimg.cc/KYsRb34w/IMG-20250413-WA0111-BIDISHA-DAS.jpg',
      },
      {
        name: 'Ankit Tewary',
        role: 'PR & Outreach Team Member',
        image:
          'https://i.postimg.cc/wj21WGzd/IMG-20251225-112110-ANKIT-TEWARY(1).jpg',
      },
      {
        name: 'Neel Bose',
        role: 'PR & Outreach Team Member',
        image:
          'https://i.postimg.cc/8kvj85G2/Snapchat-1901994285(1)-NEEL-BOSE(2).jpg',
      },
      {
        name: 'Pujan Dutta',
        role: 'PR & Outreach Team Member',
        image:
          'https://i.postimg.cc/kMSBr4CK/Pi7_Passport_Photo_PUJAN_DUTTA(1).jpg',
      },
      {
        name: 'Sneha Halder',
        role: 'PR & Outreach Team Member',
        image:
          'https://i.postimg.cc/CK6z0nds/IMG-20250331-WA0051-(1)-SNEHA-HALDER(1).jpg',
      },
      {
        name: 'Sharmistha Ghosh',
        role: 'PR & Outreach Team Member',
        image: 'https://i.postimg.cc/2SVW09hM/image.png',
      },
      {
        name: 'Supriti Ghosh',
        role: 'PR & Outreach Team Member',
        image:
          'https://i.postimg.cc/B6rbLWTL/IMG-20251225-WA0284-Supriti-Ghosh.jpg',
      },
      {
        name: 'Soumyadeep Sardar',
        role: 'PR & Outreach Team Member',
        image: 'https://i.postimg.cc/0yVNGKGQ/IMG_0275_SOUMYADEEP_SARDAR.jpg',
      },
      {
        name: 'Sohom Sarkar',
        role: 'PR & Outreach Team Member',
        image:
          'https://i.postimg.cc/VkgJ7Vwt/IMG-20251226-014922-SOHOM-SARKAR(2).jpg',
      },
      {
        name: 'Swastik Saha',
        role: 'PR & Outreach Team Member',
        image:
          'https://i.postimg.cc/G289m3yD/IMG-20251220-WA0070-SWASTIK-SAHA(1).jpg',
      },
      {
        name: 'Sirsho Biswas',
        role: 'PR & Outreach Team Member',
        image:
          'https://i.postimg.cc/HkdJ9Cf0/IMG-20250928-171529-SIRSHO-BISWAS(1).jpg',
      },
      {
        name: 'Hemant Gaura',
        role: 'PR & Outreach Team Member',
        image:
          'https://i.postimg.cc/K8GzgDM9/1000377176_Picsart_Ai_Image_Enhancer_HEMANT_GAURA(1).png',
      },
      {
        name: 'Tiasha Sarkar',
        role: 'PR & Outreach Team Member',
        image:
          'https://i.postimg.cc/mDzhgZHC/IMG-20251225-WA0047-TIASHA-SARKAR(1).jpg',
      },
      {
        name: 'Suchana Barua',
        role: 'PR & Outreach Team Member',
        image:
          'https://i.postimg.cc/3Jg4GwbR/IMG-20250614-162048-SUCHANA-BARUA(1).jpg',
      },
      {
        name: 'Arko Chakraborty',
        role: 'PR & Outreach Team Member',
        image:
          'https://i.postimg.cc/1tn43Rqf/IMG-20251218-WA0071-ARKO-CHAKRABORTY.jpg',
      },
      {
        name: 'Junaid Khan',
        role: 'PR & Outreach Team Member',
        image:
          'https://i.postimg.cc/0ynztBvm/IMG-20251226-101304-095-JUNAID-KHAN.webp',
      },
      {
        name: 'Umar Raza Ansari',
        role: 'PR & Outreach Team Member',
        image:
          'https://i.postimg.cc/k55BLvMQ/IMG-20251226-123650-UMAR-RAZA-ANSARI.jpg',
      },
      {
        name: 'Spandan Biswas',
        role: 'PR & Outreach Team Member',
        image:
          'https://i.postimg.cc/28pL3WTY/IMG-20240929-195913-601-SPANDAN-BISWAS.webp',
      },
      {
        name: 'Joyeeta Majumder',
        role: 'PR & Outreach Team Member',
        image:
          'https://i.postimg.cc/RF6qZCH4/img20251123-19060340-JOYEETA-MAJUMDER.jpg',
      },
    ],
  },
  // // logistics team completed
  // {
  //   category: 'Logistics Team',
  //   id: 'logistics',
  //   path: '/team/logistics',
  //   members: [
  //     {
  //       name: 'Arnab Dey',
  //       role: 'Logistics Team Lead',
  //       image: 'https://i.postimg.cc/0NGnY7ds/EjMuVkC.jpg',
  //     },
  //     {
  //       name: 'Aditya Chakraborty',
  //       role: 'Logistics Team Member',
  //       image:
  //         'https://i.postimg.cc/rsjNBTZY/IMG-20231128-WA0006-ADITYA-CHAKRABORTY.jpg',
  //     },
  //     {
  //       name: 'Arnob Podder',
  //       role: 'Logistics Team Member',
  //       image: 'https://i.postimg.cc/3RcKn0YL/IMG-2897-ARNOB-PODDER.jpg',
  //     },
  //     {
  //       name: 'Ankan Ghosh',
  //       role: 'Logistics Team Member',
  //       image:
  //         'https://i.postimg.cc/kXrypj1m/IMG-20250224-WA0046-ANKAN-GHOSH.jpg',
  //     },
  //     {
  //       name: 'Mohit Chowdhury',
  //       role: 'Logistics Team Member',
  //       image: 'https://i.postimg.cc/h4Xxg9zt/IMG-9828-MOHIT-CHOWDHURY.jpg',
  //     },
  //     {
  //       name: 'Tarif Chowdhury',
  //       role: 'Logistics Team Member',
  //       image:
  //         'https://i.postimg.cc/52X2Ch4r/9b562a9e-eeb4-4170-b15c-694e8c584c30.jpg',
  //     },
  //     {
  //       name: 'Pratik Chowdhury',
  //       role: 'Logistics Team Member',
  //       image:
  //         'https://i.postimg.cc/28v0jpby/20250304-142312-ANUSHKA-GHOSH.jpg',
  //     },
  //     {
  //       name: 'Somen Saha',
  //       role: 'Logistics Team Member',
  //       image:
  //         'https://i.postimg.cc/hjq8hvH5/IMG20250203162227-imresizer-SOMEN-SAHA.jpg',
  //     },
  //     {
  //       name: 'Supratim Sen',
  //       role: 'Logistics Team Member',
  //       image:
  //         'https://i.postimg.cc/kDr7drVK/IMG-20250305-020623-SUPRATIM-SEN.jpg',
  //     },
  //     {
  //       name: 'Sagar Raj Yadav',
  //       role: 'Logistics Team Member',
  //       image:
  //         'https://i.postimg.cc/nr9n5VLn/IMG20240710105920-SAGAR-RAJYADAV.jpg',
  //     },
  //   ],
  // },
  //sponsorship team completed
  {
    category: 'Sponsorship',
    id: 'sponsorship',
    path: '/team/sponsorship',
    icon: <FaMoneyCheck className="text-yellow-200" />,
    members: [
      {
        name: 'Tiyasa Raptan',
        role: 'Sponsorship Team Lead',
        image:
          'https://i.postimg.cc/yNrkK3Wf/IMG_20250921_WA0152_TIYASA_RAPTAN.jpg',
      },
      {
        name: 'Soumyaraj Bag',
        role: 'Sponsorship Team Lead',
        image: 'https://i.postimg.cc/5NNyXmLV/image.png',
      },
      {
        name: 'Neel Bose',
        role: 'Sponsorship Team Member',
        image:
          'https://i.postimg.cc/8kvj85G2/Snapchat-1901994285(1)-NEEL-BOSE(2).jpg',
      },
      {
        name: 'Arijit Saha',
        role: 'Sponsorship Team Member',
        image:
          'https://i.postimg.cc/5tt6DS9n/IMG-20241211-WA0167(3)-ARIJIT-SAHA(1).jpg',
      },
      {
        name: 'Adrika Mukherjee',
        role: 'Sponsorship Team Member',
        image:
          'https://i.postimg.cc/DZJmwfXm/IMG_20251119_WA0123_ADRIKA_MUKHERJEE.jpg',
      },
      {
        name: 'Rajdeep Shome',
        role: 'Sponsorship Team Member',
        image:
          'https://i.postimg.cc/cL0KBNVD/IMG-20251201-221135-RAJDEEP-SHOME.jpg',
      },
      {
        name: 'Tilak Sadhukhan',
        role: 'Sponsorship Team Member',
        image:
          'https://i.postimg.cc/vZb1tdJy/IMG-20251218-193556-TILAK-SADHUKHAN.jpg',
      },
      {
        name: 'Biswarup Ganguly',
        role: 'Sponsorship Team Member',
        image:
          'https://i.postimg.cc/mr6t41tG/IMG-20250929-WA0287-BISWARUP-GANGULY.jpg',
      },

      {
        name: 'Shreya Chakraborty',
        role: 'Sponsorship Team Member',
        image: 'https://i.postimg.cc/jdVnCfcF/IMG-4542-Shreya-Chakraborty.jpg',
      },
    ],
  },
  // {
  //   category: 'Security Team',
  //   id: 'security',
  //   path: '/team/security',
  //   members: [
  //     {
  //       name: 'Bibasan Mitra',
  //       role: 'Security Team Lead',
  //       image:
  //         'https://i.postimg.cc/m2cPtsTJ/IMG-20250303-091158-BIBASAN-MITRA.jpg',
  //     },
  //     {
  //       name: 'Trideep Roy',
  //       role: 'Security Team Member',
  //       image:
  //         'https://i.postimg.cc/j5pyB5hX/IMG-20250303-124708-TRIDEEP-ROY.jpg',
  //     },
  //     {
  //       name: 'Imran Alam',
  //       role: 'Security Team Member',
  //       image:
  //         'https://i.postimg.cc/Qt9p65cC/IMG-20250303-WA0011-IMRAN-ALAM.jpg',
  //     },
  //   ],
  // },
  //food team completed
  // {
  //   category: "Food Team",
  //   id: "food",
  //   path: "/team/food",
  //   members: [
  //     {
  //       name: "Sunanda Das",
  //       role: "Food & Refreshments Team Lead",
  //       image: "https://i.postimg.cc/YCHTWxjv/SUNANDA-DAS.jpg",
  //     },
  //     {
  //       name: "Diptodeep Biswas",
  //       role: "Food & Refreshments Team Lead",
  //       image: "https://i.postimg.cc/05hKwLd4/IMG-20230105-212922.jpg",
  //     },
  //     {
  //       name: "Sambhabi Das",
  //       role: "Food & Refreshments Team Member",
  //       image: "https://i.postimg.cc/mrZqd2YR/Sambhabi-Das.jpg",
  //     },
  //     {
  //       name: "Nikiza Biswas",
  //       role: "Food & Refreshments Team Member",
  //       image: "https://i.postimg.cc/1zWdbhBF/NIKIZA-BISWAS.jpg",
  //     },
  //   ],
  // },
  //register team completed
  // {
  //   category: 'Registration Team',
  //   id: 'registration',
  //   path: '/team/registration',
  //   members: [
  //     {
  //       name: 'Ankita Naskar',
  //       role: 'Registration Team Lead',
  //       image:
  //         'https://i.postimg.cc/3xf1n5g3/IMG-20250222-210125-ANKITA-NASKAR.jpg',
  //     },
  //     {
  //       name: 'Sambhabi Das',
  //       role: 'Registration Team Member',
  //       image: 'https://i.postimg.cc/ydzhWVmY/IMG-1178-SAMBHABI-DAS.jpg',
  //     },
  //     {
  //       name: 'Debdyuti Mondal',
  //       role: 'Registration Team Member',
  //       image:
  //         'https://i.postimg.cc/xCTF4TBF/IMG-20250222-WA0046-1-DEBDYUTI-MONDAL.jpg',
  //     },
  //     {
  //       name: 'Arijit Saha',
  //       role: 'Registration Team Member',
  //       image:
  //         'https://i.postimg.cc/J7xN68Rd/da0248d4-5b5b-4da6-ab89-290ad76e8c58.jpg',
  //     },
  //     {
  //       name: 'Debatree Chanda',
  //       role: 'Registration Team Member',
  //       image:
  //         'https://i.postimg.cc/7YBNXrkm/IMG-20250208-232032-DEBATREE-CHANDA.jpg',
  //     },
  //     {
  //       name: 'Kasturi Bhattacharya',
  //       role: 'Registration Team Member',
  //       image:
  //         'https://i.postimg.cc/pdjY29n6/DSC-1397-KASTURI-BHATTACHARYA.jpg',
  //     },
  //     {
  //       name: 'Sreejit Mondal ',
  //       role: 'Registration Team Member',
  //       image:
  //         'https://i.postimg.cc/Z5CxMsYZ/New-Doc-10-23-2024-22-56-removebg-preview-SREEJIT-MONDAL.png',
  //     },
  //     {
  //       name: 'Monaj Barman ',
  //       role: 'Registration Team Member',
  //       image:
  //         'https://i.postimg.cc/BnkB95tF/IMG-20230529-140649-900-removebg-preview-1-MONAJ-BARMAN.png',
  //     },
  //   ],
  // },
  // {
  //   category: 'EMMC Team',
  //   id: 'emmc',
  //   path: '/team/emmc',
  //   icon: <FaMicrophone className="text-yellow-200" />,
  //   members: [
  //     {
  //       name: 'Kasturi Bhattacharya',
  //       role: 'Anchor Team',
  //       image:
  //         'https://i.postimg.cc/bJV5BK8b/Whats-App-Image-2025-05-15-at-01-21-31-b7752756.jpg',
  //     },
  //   ],
  // },
];
