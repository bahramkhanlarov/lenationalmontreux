const translations = {
    en: {
        // Navigation
        navGallery: "Gallery",
        navApartment: "The Apartment",
        navBook: "Book",
        navLocation: "Location",
        navContact: "Contact",
        navBookNow: "Book Now",

        // Hero
        heroLocation: "Montreux, Switzerland",
        heroPillBadge: "New",
        heroPillText: "Direct booking · Best rates guaranteed",
        heroTitle: "Le National Montreux",
        heroSubtitle: "Luxury living on the shores of Lake Geneva",
        heroReserve: "Reserve Your Stay",
        heroExplore: "Explore the Apartment",

        // Features Bar
        featureBedrooms: "2 Bedrooms · Up to 8 Guests",
        featureViews: "Lake & Mountain Views",
        featureFestival: "Jazz Festival Location",
        featureRating: "4.9 on Airbnb",
        featureAirport: "55 min Geneva Airport",

        // Gallery
        galleryLabel: "Photo Gallery",
        galleryTitle: "Inside Le National",
        galleryViewAll: "View All Photos",

        // About
        aboutLabel: "The Apartment",
        aboutTitle: "Your Home Above Lake Geneva",
        aboutText1: "Nestled in the heart of Montreux, Le National is a beautifully appointed apartment offering sweeping views of Lake Geneva and the Alps. Whether you're here for the world-famous Jazz Festival, a mountain retreat, or simply to soak in the charm of the Swiss Riviera, this is your perfect base.",
        aboutText2: "The apartment blends contemporary comfort with timeless elegance — high ceilings, designer furnishings, a fully equipped kitchen, and a terrace where you can sip your morning coffee as the lake shimmers below.",

        // Amenities
        amenityLakeViews: "Lake views",
        amenityFullKitchen: "Full kitchen",
        amenityWiFi: "High-speed WiFi",
        amenitySmartTV: "Smart TV",
        amenityWasherDryer: "Washer/Dryer",
        amenityAC: "AC & Heating",
        amenityTerrace: "Private terrace",
        amenityLinens: "Premium linens",
        amenityKeyless: "Keyless entry",
        amenityParking: "Private parking",
        amenitySpa: "Access to Spa (swimming pool, fitness, jacuzzi, hamam, sauna)",
        amenityBabyCot: "Baby cot available",

        // Booking
        bookingLabel: "Instant Booking",
        bookingTitle: "Reserve Your Dates",
        bookingDesc: "Select your check-in and check-out dates below. Secure payment via Stripe. You will be redirected to complete your booking.",
        bookingDetails: "Booking Details",
        formCheckIn: "Check-in",
        formCheckOut: "Check-out",
        formGuests: "Guests",
        formNights: "Nights",
        formFirstName: "First Name",
        formLastName: "Last Name",
        formEmail: "Email Address",
        formGuest1: "1 guest",
        formGuest2: "2 guests",
        formGuest3: "3 guests",
        formGuest4: "4 guests",
        formGuest5: "5 guests",
        formGuest6: "6 guests",
        priceLabel: "Rate × nights",
        priceCleaning: "Cleaning fee",
        priceTotal: "Total",
        btnProceedPayment: "Proceed to Payment",
        bookingNote: "Minimum 3 nights · Free cancellation up to 14 days before check-in",
        calLegendSelected: "Selected",
        calLegendStay: "Your stay",
        calLegendUnavailable: "Unavailable",
        calStatusSelect: "Select your check-in date",

        // Reviews
        reviewsLabel: "Guest Reviews",
        reviewsTitle: "What Guests Say",
        reviewAuthor1: "— Sophie M., Paris · July 2025",
        reviewAuthor2: "— Marcus T., London · July 2025",
        reviewAuthor3: "— Ingrid L., Stockholm · August 2025",
        reviewRatingLabel: "Exceptional",
        reviewRatingDesc: "Rated 4.9 out of 5 on Airbnb",
        reviewViewListing: "View listing →",

        // Location
        locationLabel: "Where We Are",
        locationTitle: "Montreux, Swiss Riviera",
        locationDesc: "Le National sits in the centre of Montreux, within easy walking distance of the lakefront promenade, fine dining, and world-class attractions.",
        locPromenade: "Lake Geneva promenade — 3 min walk",
        locFestival: "Jazz Festival venues — 5 min walk",
        locCastle: "Château de Chillon — 15 min by train",
        locTrain: "Montreux train station — 8 min walk",
        locAirport: "Geneva Airport — 55 min by train",
        locSkiResort: "Leysin ski resort — 45 min by car",
        locDining: "Fine dining — multiple within 2 min",

        // Contact
        contactLabel: "Get in Touch",
        contactTitle: "Contact Us",
        contactHeading: "We'd love to hear from you",
        contactDesc: "Have a question about the apartment, availability, or your upcoming stay? Send us a message and we'll get back to you within 24 hours.",
        contactEmail: "info@lenationalmontreux.ch",
        contactAddress: "Avenue du Casino 10, 1820 Montreux",
        contactUrgent: "For urgent matters regarding an existing booking, please contact us directly by email.",
        contactName: "Your name",
        contactEmailPlaceholder: "Your email address",
        contactSubject: "Subject (e.g. Availability inquiry)",
        contactMessage: "Your message…",
        contactSend: "Send Message",
        contactSuccess: "✓ Thank you! Your message has been sent. We'll be in touch within 24 hours.",

        // Check-in CTA
        checkinHeading: "Already Booked?",
        checkinDesc: "Complete your digital check-in and upload your travel documents before arrival for a seamless experience.",
        checkinButton: "Go to Check-in",

        // Check-in page
        ciHeader: "Guest Check-in & Document Signing",
        ciWelcomeTitle: "Welcome to Le National de Montreux",
        ciWelcomeDesc: "These short guides will walk you through everything you need to know before your arrival — how to reach the apartment from Montreux train station, how to collect your room keys, and how to access the private garage and Spa & Wellness centre. Please watch all three videos before proceeding to sign your documents.",
        ciVideo1: "▶ Check-in Guide — Part 1",
        ciVideo2: "▶ Check-in Guide — Part 2",
        ciVideo3: "▶ Check-in Guide — Part 3",
        ciStartBtn: "Proceed to Check-in Documents →",
        ciStep1: "Registration",
        ciStep2: "Building Rules",
        ciStep3: "Wellness & SPA",
        ciStep4: "Complete",
        ciStep1Title: "Record of Arrival / Meldeschein / Bulletin d'enregistrement",
        ciLabelApartment: "Apartment",
        ciLabelArrival: "Arrival",
        ciLabelDeparture: "Departure",
        ciLabelName: "Surname, First Name / Nom, Prénom",
        ciLabelStreet: "Street, Number / Rue, Numéro",
        ciLabelCity: "ZIP, City / NPA, Localité",
        ciLabelPassport: "Passport Nr / N° de passeport",
        ciLabelDob: "Date of Birth / Date de naissance",
        ciLabelNationality: "Nationality / Nationalité",
        ciLabelAdults: "Adults (16+)",
        ciLabelChildren: "Children (0–15)",
        ciPlaceholderName: "Full name",
        ciPlaceholderStreet: "Street address",
        ciPlaceholderCity: "e.g. 1820 Montreux",
        ciPlaceholderPassport: "Passport number",
        ciPlaceholderNationality: "Nationality",
        ciSigLabel: "Signature / Unterschrift",
        ciSigPlaceholder1: "Sign here with your mouse or finger",
        ciSigPlaceholder: "Sign here",
        ciClear: "Clear",
        ciErrSig1: "Please provide your signature to continue.",
        ciErrSig: "Please provide your signature.",
        ciContinueBuilding: "Continue to Building Rules →",
        ciStep2DownloadNote: "Download to read the complete 21-page document",
        ciAckBuilding: "I confirm that I have read and understood the Building Rules (Règlement d'administration et d'utilisation) of the co-ownership Le National de Montreux and I agree to comply with all its provisions during my stay.",
        ciErrAckBuilding: "Please confirm that you have read the building rules.",
        ciBack: "← Back",
        ciContinueWellness: "Continue to Wellness Rules →",
        ciStep3DownloadNote: "Download to read the complete document",
        ciAckWellness: "I confirm that I have read and understood the Wellness & SPA Facility Rules and I agree to comply with all its provisions during my stay at Le National de Montreux.",
        ciErrAckWellness: "Please confirm that you have read the wellness rules.",
        ciCompleteCheckin: "✓ Complete Check-in",
        ciCompleteTitle: "Check-in Complete!",
        ciCompleteDesc: "Thank you. All documents have been signed successfully.",
        ciDownloadPdf: "📥 Download PDF",
        ciPrint: "🖨️ Print / Save",
        ciViewSummary: "👁️ View Summary",
    },

    fr: {
        // Navigation
        navGallery: "Galerie",
        navApartment: "L'Appartement",
        navBook: "Réserver",
        navLocation: "Localisation",
        navContact: "Contact",
        navBookNow: "Réserver Maintenant",

        // Hero
        heroLocation: "Montreux, Suisse",
        heroPillBadge: "Nouveau",
        heroPillText: "Réservation directe · Meilleurs tarifs garantis",
        heroTitle: "Le National Montreux",
        heroSubtitle: "Vie de luxe au bord du Lac Léman",
        heroReserve: "Réservez Votre Séjour",
        heroExplore: "Découvrir l'Appartement",

        // Features Bar
        featureBedrooms: "2 Chambres · Jusqu'à 8 Personnes",
        featureViews: "Vue Lac & Montagnes",
        featureFestival: "Lieu du Festival de Jazz",
        featureRating: "4,9 sur Airbnb",
        featureAirport: "55 min Aéroport Genève",

        // Gallery
        galleryLabel: "Galerie Photo",
        galleryTitle: "À l'Intérieur du National",
        galleryViewAll: "Voir Toutes les Photos",

        // About
        aboutLabel: "L'Appartement",
        aboutTitle: "Votre Maison au-Dessus du Lac Léman",
        aboutText1: "Niché au cœur de Montreux, Le National est un appartement magnifiquement aménagé offrant une vue panoramique sur le Lac Léman et les Alpes. Que vous soyez ici pour le célèbre Festival de Jazz, une retraite montagnarde, ou simplement pour profiter du charme de la Riviera Suisse, c'est votre base parfaite.",
        aboutText2: "L'appartement allie le confort contemporain à l'élégance intemporelle — hauts plafonds, mobilier design, cuisine entièrement équipée, et une terrasse où vous pourrez savourer votre café du matin en regardant le lac scintiller.",

        // Amenities
        amenityLakeViews: "Vue sur le lac",
        amenityFullKitchen: "Cuisine complète",
        amenityWiFi: "WiFi haute vitesse",
        amenitySmartTV: "Smart TV",
        amenityWasherDryer: "Lave-linge/Sèche-linge",
        amenityAC: "Climatisation & Chauffage",
        amenityTerrace: "Terrasse privée",
        amenityLinens: "Draps premium",
        amenityKeyless: "Accès sans clé",
        amenityParking: "Parking privé",
        amenitySpa: "Accès au Spa (piscine, fitness, jacuzzi, hamam, sauna)",
        amenityBabyCot: "Lit bébé disponible",

        // Booking
        bookingLabel: "Réservation Instantanée",
        bookingTitle: "Réservez Vos Dates",
        bookingDesc: "Sélectionnez vos dates d'arrivée et de départ ci-dessous. La disponibilité est synchronisée en temps réel avec notre calendrier Airbnb. Paiement sécurisé via Stripe. Vous serez redirigé pour finaliser votre réservation.",
        bookingDetails: "Détails de la Réservation",
        formCheckIn: "Arrivée",
        formCheckOut: "Départ",
        formGuests: "Voyageurs",
        formNights: "Nuits",
        formFirstName: "Prénom",
        formLastName: "Nom",
        formEmail: "Adresse Email",
        formGuest1: "1 voyageur",
        formGuest2: "2 voyageurs",
        formGuest3: "3 voyageurs",
        formGuest4: "4 voyageurs",
        formGuest5: "5 voyageurs",
        formGuest6: "6 voyageurs",
        priceLabel: "Tarif × nuits",
        priceCleaning: "Frais de nettoyage",
        priceTotal: "Total",
        btnProceedPayment: "Procéder au Paiement",
        bookingNote: "Minimum 3 nuits · Annulation gratuite jusqu'à 14 jours avant l'arrivée",
        calLegendSelected: "Sélectionné",
        calLegendStay: "Votre séjour",
        calLegendUnavailable: "Non disponible",
        calStatusSelect: "Sélectionnez votre date d'arrivée",

        // Reviews
        reviewsLabel: "Avis des Clients",
        reviewsTitle: "Ce que Disent les Clients",
        reviewAuthor1: "— Sophie M., Paris · Juillet 2025",
        reviewAuthor2: "— Marcus T., Londres · Juillet 2025",
        reviewAuthor3: "— Ingrid L., Stockholm · Août 2025",
        reviewRatingLabel: "Exceptionnel",
        reviewRatingDesc: "Noté 4,9 sur 5 sur Airbnb",
        reviewViewListing: "Voir l'annonce →",

        // Location
        locationLabel: "Où Nous Sommes",
        locationTitle: "Montreux, Riviera Suisse",
        locationDesc: "Le National se situe au centre de Montreux, à distance de marche facile de la promenade lacustre, de restaurants gastronomiques et d'attractions de classe mondiale.",
        locPromenade: "Promenade du Lac Léman — 3 min à pied",
        locFestival: "Lieux du Festival de Jazz — 5 min à pied",
        locCastle: "Château de Chillon — 15 min en train",
        locTrain: "Gare de Montreux — 8 min à pied",
        locAirport: "Aéroport Genève — 55 min en train",
        locSkiResort: "Station de ski Leysin — 45 min en voiture",
        locDining: "Gastronomie — plusieurs restaurants à moins de 2 min",

        // Contact
        contactLabel: "Nous Contacter",
        contactTitle: "Contact",
        contactHeading: "Nous adorerions vous entendre",
        contactDesc: "Vous avez une question sur l'appartement, la disponibilité, ou votre séjour à venir ? Envoyez-nous un message et nous vous répondrons dans les 24 heures.",
        contactEmail: "info@lenationalmontreux.ch",
        contactAddress: "Avenue du Casino 10, 1820 Montreux",
        contactUrgent: "Pour les questions urgentes concernant une réservation existante, contactez-nous directement par email.",
        contactName: "Votre nom",
        contactEmailPlaceholder: "Votre adresse email",
        contactSubject: "Sujet (ex. Demande de disponibilité)",
        contactMessage: "Votre message…",
        contactSend: "Envoyer le Message",
        contactSuccess: "✓ Merci ! Votre message a été envoyé. Nous vous répondrons dans les 24 heures.",

        // Check-in CTA
        checkinHeading: "Déjà Réservé?",
        checkinDesc: "Complétez votre enregistrement numérique et téléchargez vos documents de voyage avant votre arrivée pour une expérience sans friction.",
        checkinButton: "Aller à l'Enregistrement",

        // Check-in page
        ciHeader: "Enregistrement des Hôtes & Signature des Documents",
        ciWelcomeTitle: "Bienvenue au Le National de Montreux",
        ciWelcomeDesc: "Ces courtes vidéos vous guideront à travers tout ce que vous devez savoir avant votre arrivée — comment rejoindre l'appartement depuis la gare de Montreux, comment récupérer vos clés, et comment accéder au garage privé et au centre Spa & Wellness. Veuillez regarder les trois vidéos avant de signer vos documents.",
        ciVideo1: "▶ Guide d'Arrivée — Partie 1",
        ciVideo2: "▶ Guide d'Arrivée — Partie 2",
        ciVideo3: "▶ Guide d'Arrivée — Partie 3",
        ciStartBtn: "Procéder aux Documents d'Enregistrement →",
        ciStep1: "Enregistrement",
        ciStep2: "Règlement Intérieur",
        ciStep3: "Wellness & SPA",
        ciStep4: "Terminé",
        ciStep1Title: "Bulletin d'enregistrement / Record of Arrival / Meldeschein",
        ciLabelApartment: "Appartement",
        ciLabelArrival: "Arrivée",
        ciLabelDeparture: "Départ",
        ciLabelName: "Nom, Prénom / Surname, First Name",
        ciLabelStreet: "Rue, Numéro / Street, Number",
        ciLabelCity: "NPA, Localité / ZIP, City",
        ciLabelPassport: "N° de passeport / Passport Nr",
        ciLabelDob: "Date de naissance / Date of Birth",
        ciLabelNationality: "Nationalité / Nationality",
        ciLabelAdults: "Adultes (16+)",
        ciLabelChildren: "Enfants (0–15)",
        ciPlaceholderName: "Nom complet",
        ciPlaceholderStreet: "Adresse postale",
        ciPlaceholderCity: "ex. 1820 Montreux",
        ciPlaceholderPassport: "Numéro de passeport",
        ciPlaceholderNationality: "Nationalité",
        ciSigLabel: "Signature / Unterschrift",
        ciSigPlaceholder1: "Signez ici avec votre souris ou votre doigt",
        ciSigPlaceholder: "Signez ici",
        ciClear: "Effacer",
        ciErrSig1: "Veuillez apposer votre signature pour continuer.",
        ciErrSig: "Veuillez apposer votre signature.",
        ciContinueBuilding: "Continuer vers le Règlement Intérieur →",
        ciStep2DownloadNote: "Télécharger pour lire le document complet de 21 pages",
        ciAckBuilding: "Je confirme avoir lu et compris le Règlement d'administration et d'utilisation de la copropriété Le National de Montreux et je m'engage à respecter toutes ses dispositions pendant mon séjour.",
        ciErrAckBuilding: "Veuillez confirmer que vous avez lu le règlement intérieur.",
        ciBack: "← Retour",
        ciContinueWellness: "Continuer vers le Règlement Wellness →",
        ciStep3DownloadNote: "Télécharger pour lire le document complet",
        ciAckWellness: "Je confirme avoir lu et compris le Règlement d'utilisation de l'Espace Fitness/Piscine/Wellness et je m'engage à respecter toutes ses dispositions pendant mon séjour au Le National de Montreux.",
        ciErrAckWellness: "Veuillez confirmer que vous avez lu le règlement wellness.",
        ciCompleteCheckin: "✓ Terminer l'Enregistrement",
        ciCompleteTitle: "Enregistrement Terminé !",
        ciCompleteDesc: "Merci. Tous les documents ont été signés avec succès.",
        ciDownloadPdf: "📥 Télécharger le PDF",
        ciPrint: "🖨️ Imprimer / Sauvegarder",
        ciViewSummary: "👁️ Voir le Résumé",
    },

    de: {
        // Navigation
        navGallery: "Galerie",
        navApartment: "Die Wohnung",
        navBook: "Buchen",
        navLocation: "Lage",
        navContact: "Kontakt",
        navBookNow: "Jetzt Buchen",

        // Hero
        heroLocation: "Montreux, Schweiz",
        heroPillBadge: "Neu",
        heroPillText: "Direktbuchung · Beste Preise garantiert",
        heroTitle: "Le National Montreux",
        heroSubtitle: "Luxusleben am Ufer des Genfer Sees",
        heroReserve: "Reservieren Sie Ihren Aufenthalt",
        heroExplore: "Die Wohnung Entdecken",

        // Features Bar
        featureBedrooms: "2 Schlafzimmer · Bis zu 8 Gäste",
        featureViews: "See- & Bergblick",
        featureFestival: "Ort des Jazzfestivals",
        featureRating: "4,9 auf Airbnb",
        featureAirport: "55 Min. Flughafen Genf",

        // Gallery
        galleryLabel: "Fotogalerie",
        galleryTitle: "Im Inneren des National",
        galleryViewAll: "Alle Fotos Anzeigen",

        // About
        aboutLabel: "Die Wohnung",
        aboutTitle: "Ihr Zuhause über dem Genfer See",
        aboutText1: "Le National ist eine wunderschön eingerichtete Wohnung im Herzen von Montreux mit herrlichem Blick auf den Genfer See und die Alpen. Egal, ob Sie für das weltberühmte Jazzfestival, einen Bergurlaub oder einfach zum Genießen der Schweizer Riviera kommen, dies ist Ihre perfekte Basis.",
        aboutText2: "Die Wohnung verbindet zeitgenössischen Komfort mit zeitloser Eleganz — hohe Decken, Designer-Möbel, vollausgestattete Küche und eine Terrasse, wo Sie Ihren Morgenkaffee trinken können, während der See unten funkelt.",

        // Amenities
        amenityLakeViews: "Seeblick",
        amenityFullKitchen: "Vollständige Küche",
        amenityWiFi: "High-Speed-WiFi",
        amenitySmartTV: "Smart TV",
        amenityWasherDryer: "Waschmaschine/Trockner",
        amenityAC: "Klimaanlage & Heizung",
        amenityTerrace: "Private Terrasse",
        amenityLinens: "Premium Bettwäsche",
        amenityKeyless: "Schlüsselloses Zugang",
        amenityParking: "Private Parkplatz",
        amenitySpa: "Zugang zum Spa (Schwimmbad, Fitness, Whirlpool, Hamam, Sauna)",
        amenityBabyCot: "Babybett verfügbar",

        // Booking
        bookingLabel: "Sofortige Buchung",
        bookingTitle: "Buchen Sie Ihre Termine",
        bookingDesc: "Wählen Sie unten Ihre An- und Abreisedatum aus. Die Verfügbarkeit wird in Echtzeit mit unserem Airbnb-Kalender synchronisiert. Sichere Bezahlung über Stripe. Sie werden zum Abschluss Ihrer Buchung weitergeleitet.",
        bookingDetails: "Buchungsdetails",
        formCheckIn: "Ankunft",
        formCheckOut: "Abreise",
        formGuests: "Gäste",
        formNights: "Nächte",
        formFirstName: "Vorname",
        formLastName: "Nachname",
        formEmail: "Email-Adresse",
        formGuest1: "1 Gast",
        formGuest2: "2 Gäste",
        formGuest3: "3 Gäste",
        formGuest4: "4 Gäste",
        formGuest5: "5 Gäste",
        formGuest6: "6 Gäste",
        priceLabel: "Tarif × Nächte",
        priceCleaning: "Reinigungsgebühr",
        priceTotal: "Gesamt",
        btnProceedPayment: "Zur Zahlung",
        bookingNote: "Mindestens 3 Nächte · Kostenlose Stornierung bis 14 Tage vor Ankunft",
        calLegendSelected: "Ausgewählt",
        calLegendStay: "Ihr Aufenthalt",
        calLegendUnavailable: "Nicht verfügbar",
        calStatusSelect: "Wählen Sie Ihr Ankunftsdatum",

        // Reviews
        reviewsLabel: "Gastbewertungen",
        reviewsTitle: "Was Gäste Sagen",
        reviewAuthor1: "— Sophie M., Paris · Juli 2025",
        reviewAuthor2: "— Marcus T., London · Juli 2025",
        reviewAuthor3: "— Ingrid L., Stockholm · August 2025",
        reviewRatingLabel: "Außergewöhnlich",
        reviewRatingDesc: "4,9 von 5 auf Airbnb bewertet",
        reviewViewListing: "Angebot ansehen →",

        // Location
        locationLabel: "Wo Wir Sind",
        locationTitle: "Montreux, Schweizer Riviera",
        locationDesc: "Le National befindet sich im Zentrum von Montreux, leicht zu Fuß erreichbar von der Seepromenade, gehobenen Restaurants und weltklasse-Attraktionen.",
        locPromenade: "Genfer See Promenade — 3 Min zu Fuß",
        locFestival: "Jazzfestival-Veranstaltungsorte — 5 Min zu Fuß",
        locCastle: "Château de Chillon — 15 Min mit dem Zug",
        locTrain: "Bahnhof Montreux — 8 Min zu Fuß",
        locAirport: "Flughafen Genf — 55 Min mit dem Zug",
        locSkiResort: "Skigebiet Leysin — 45 Min mit dem Auto",
        locDining: "Gehobene Küche — mehrere Restaurants in weniger als 2 Min",

        // Contact
        contactLabel: "Kontaktieren Sie Uns",
        contactTitle: "Kontakt",
        contactHeading: "Wir freuen uns, von Ihnen zu hören",
        contactDesc: "Haben Sie eine Frage zur Wohnung, Verfügbarkeit oder Ihrem bevorstehenden Aufenthalt? Senden Sie uns eine Nachricht und wir antworten innerhalb von 24 Stunden.",
        contactEmail: "info@lenationalmontreux.ch",
        contactAddress: "Avenue du Casino 10, 1820 Montreux",
        contactUrgent: "Bei dringenden Fragen zu bestehenden Buchungen kontaktieren Sie uns bitte direkt per E-Mail.",
        contactName: "Ihr Name",
        contactEmailPlaceholder: "Ihre E-Mail-Adresse",
        contactSubject: "Betreff (z.B. Verfügbarkeitsanfrage)",
        contactMessage: "Ihre Nachricht…",
        contactSend: "Nachricht Senden",
        contactSuccess: "✓ Danke! Ihre Nachricht wurde versendet. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.",

        // Check-in CTA
        checkinHeading: "Bereits Gebucht?",
        checkinDesc: "Füllen Sie Ihren digitalen Check-in aus und laden Sie Ihre Reisedokumente vor der Ankunft hoch für ein reibungsloses Erlebnis.",
        checkinButton: "Zum Check-in",

        // Check-in page
        ciHeader: "Gäste-Check-in & Dokumentenunterzeichnung",
        ciWelcomeTitle: "Willkommen im Le National de Montreux",
        ciWelcomeDesc: "Diese kurzen Videos führen Sie durch alles, was Sie vor Ihrer Ankunft wissen müssen — wie Sie die Wohnung vom Bahnhof Montreux erreichen, wie Sie Ihre Schlüssel abholen und wie Sie auf die private Garage und das Spa & Wellness-Zentrum zugreifen. Bitte schauen Sie alle drei Videos, bevor Sie Ihre Dokumente unterzeichnen.",
        ciVideo1: "▶ Check-in Guide — Teil 1",
        ciVideo2: "▶ Check-in Guide — Teil 2",
        ciVideo3: "▶ Check-in Guide — Teil 3",
        ciStartBtn: "Weiter zu den Check-in-Dokumenten →",
        ciStep1: "Anmeldung",
        ciStep2: "Hausordnung",
        ciStep3: "Wellness & SPA",
        ciStep4: "Abgeschlossen",
        ciStep1Title: "Anmeldeformular / Record of Arrival / Bulletin d'enregistrement",
        ciLabelApartment: "Appartement",
        ciLabelArrival: "Ankunft",
        ciLabelDeparture: "Abreise",
        ciLabelName: "Nachname, Vorname / Surname, First Name",
        ciLabelStreet: "Straße, Nummer / Street, Number",
        ciLabelCity: "PLZ, Ort / ZIP, City",
        ciLabelPassport: "Reisepassnummer / Passport Nr",
        ciLabelDob: "Geburtsdatum / Date of Birth",
        ciLabelNationality: "Nationalität / Nationality",
        ciLabelAdults: "Erwachsene (16+)",
        ciLabelChildren: "Kinder (0–15)",
        ciPlaceholderName: "Vollständiger Name",
        ciPlaceholderStreet: "Adresse",
        ciPlaceholderCity: "z.B. 1820 Montreux",
        ciPlaceholderPassport: "Reisepassnummer",
        ciPlaceholderNationality: "Nationalität",
        ciSigLabel: "Unterschrift / Signature",
        ciSigPlaceholder1: "Hier mit Maus oder Finger unterschreiben",
        ciSigPlaceholder: "Hier unterschreiben",
        ciClear: "Löschen",
        ciErrSig1: "Bitte leisten Sie Ihre Unterschrift, um fortzufahren.",
        ciErrSig: "Bitte leisten Sie Ihre Unterschrift.",
        ciContinueBuilding: "Weiter zur Hausordnung →",
        ciStep2DownloadNote: "Herunterladen, um das vollständige 21-seitige Dokument zu lesen",
        ciAckBuilding: "Ich bestätige, dass ich die Hausordnung (Règlement d'administration et d'utilisation) der Eigentumsgemeinschaft Le National de Montreux gelesen und verstanden habe und verpflichte mich, alle Bestimmungen während meines Aufenthalts einzuhalten.",
        ciErrAckBuilding: "Bitte bestätigen Sie, dass Sie die Hausordnung gelesen haben.",
        ciBack: "← Zurück",
        ciContinueWellness: "Weiter zu den Wellness-Regeln →",
        ciStep3DownloadNote: "Herunterladen, um das vollständige Dokument zu lesen",
        ciAckWellness: "Ich bestätige, dass ich die Wellness & SPA-Nutzungsordnung gelesen und verstanden habe und verpflichte mich, alle Bestimmungen während meines Aufenthalts im Le National de Montreux einzuhalten.",
        ciErrAckWellness: "Bitte bestätigen Sie, dass Sie die Wellness-Regeln gelesen haben.",
        ciCompleteCheckin: "✓ Check-in Abschließen",
        ciCompleteTitle: "Check-in Abgeschlossen!",
        ciCompleteDesc: "Danke. Alle Dokumente wurden erfolgreich unterzeichnet.",
        ciDownloadPdf: "📥 PDF Herunterladen",
        ciPrint: "🖨️ Drucken / Speichern",
        ciViewSummary: "👁️ Zusammenfassung Anzeigen",
    },

    ru: {
        // Navigation
        navGallery: "Галерея",
        navApartment: "Квартира",
        navBook: "Забронировать",
        navLocation: "Местоположение",
        navContact: "Контакты",
        navBookNow: "Забронировать сейчас",

        // Hero
        heroLocation: "Монтрё, Швейцария",
        heroPillBadge: "Новое",
        heroPillText: "Прямое бронирование · Лучшие тарифы гарантированы",
        heroTitle: "Le National Монтрё",
        heroSubtitle: "Роскошная жизнь на берегу Женевского озера",
        heroReserve: "Зарезервируйте ваш тур",
        heroExplore: "Изучить апартаменты",

        // Features Bar
        featureBedrooms: "2 спальни · до 8 гостей",
        featureViews: "Вид на озеро и горы",
        featureFestival: "Место проведения Джазового фестиваля",
        featureRating: "4,9 на Airbnb",
        featureAirport: "55 минут аэропорт Женева",

        // Gallery
        galleryLabel: "Фотогалерея",
        galleryTitle: "Внутри National",
        galleryViewAll: "Просмотреть все фото",

        // About
        aboutLabel: "Квартира",
        aboutTitle: "Ваш дом над Женевским озером",
        aboutText1: "Расположенная в центре Монтрё, квартира Le National — это красиво обставленное жилье с панорамным видом на Женевское озеро и Альпы. Приезжаете ли вы на всемирно известный Джазовый фестиваль, горный отдых или просто чтобы насладиться очарованием Швейцарской Ривьеры, это ваша идеальная база.",
        aboutText2: "Квартира сочетает современный комфорт с вечной элегантностью — высокие потолки, дизайнерская мебель, полностью оборудованная кухня и терраса, где вы можете пить утренний кофе, глядя, как блеск озера внизу.",

        // Amenities
        amenityLakeViews: "Вид на озеро",
        amenityFullKitchen: "Полностью оборудованная кухня",
        amenityWiFi: "Высокоскоростной WiFi",
        amenitySmartTV: "Смарт-ТВ",
        amenityWasherDryer: "Стиральная/сушильная машина",
        amenityAC: "Кондиционер и отопление",
        amenityTerrace: "Частная терраса",
        amenityLinens: "Премиум белье",
        amenityKeyless: "Бесключевой доступ",
        amenityParking: "Частная парковка",
        amenitySpa: "Доступ в спа (бассейн, фитнес, джакузи, хамам, сауна)",
        amenityBabyCot: "Детская кроватка доступна",

        // Booking
        bookingLabel: "Мгновенное бронирование",
        bookingTitle: "Забронируйте ваши даты",
        bookingDesc: "Выберите даты прибытия и убытия ниже. Доступность синхронизируется в реальном времени с нашим календарем Airbnb. Безопасный платеж через Stripe. Вы будете перенаправлены для завершения вашего бронирования.",
        bookingDetails: "Детали бронирования",
        formCheckIn: "Прибытие",
        formCheckOut: "Убытие",
        formGuests: "Гости",
        formNights: "Ночей",
        formFirstName: "Имя",
        formLastName: "Фамилия",
        formEmail: "Адрес электронной почты",
        formGuest1: "1 гость",
        formGuest2: "2 гостя",
        formGuest3: "3 гостя",
        formGuest4: "4 гостя",
        formGuest5: "5 гостей",
        formGuest6: "6 гостей",
        priceLabel: "Тариф × ночи",
        priceCleaning: "Плата за уборку",
        priceTotal: "Итого",
        btnProceedPayment: "Перейти к оплате",
        bookingNote: "Минимум 3 ночи · Бесплатная отмена за 14 дней до прибытия",
        calLegendSelected: "Выбрано",
        calLegendStay: "Ваше пребывание",
        calLegendUnavailable: "Недоступно",
        calStatusSelect: "Выберите дату прибытия",

        // Reviews
        reviewsLabel: "Отзывы гостей",
        reviewsTitle: "Что говорят гости",
        reviewAuthor1: "— Sophie M., Paris · Июль 2025",
        reviewAuthor2: "— Marcus T., London · Июль 2025",
        reviewAuthor3: "— Ingrid L., Stockholm · Август 2025",
        reviewRatingLabel: "Исключительно",
        reviewRatingDesc: "Оценка 4,9 из 5 на Airbnb",
        reviewViewListing: "Посмотреть объявление →",

        // Location
        locationLabel: "Где мы находимся",
        locationTitle: "Монтрё, Швейцарская Ривьера",
        locationDesc: "Le National расположен в центре Монтрё, в пешей доступности от озерной набережной, ресторанов высокой кухни и достопримечательностей мирового уровня.",
        locPromenade: "Набережная Женевского озера — 3 минуты пешком",
        locFestival: "Места проведения джазового фестиваля — 5 минут пешком",
        locCastle: "Замок Шильон — 15 минут на поезде",
        locTrain: "Железнодорожный вокзал Монтрё — 8 минут пешком",
        locAirport: "Аэропорт Женева — 55 минут на поезде",
        locSkiResort: "Горнолыжный курорт Лейсин — 45 минут на машине",
        locDining: "Высокая кухня — несколько ресторанов менее чем в 2 минутах",

        // Contact
        contactLabel: "Свяжитесь с нами",
        contactTitle: "Контакты",
        contactHeading: "Нам бы хотелось услышать вас",
        contactDesc: "Есть вопрос о квартире, доступности или предстоящем пребывании? Отправьте нам сообщение, и мы ответим вам в течение 24 часов.",
        contactEmail: "info@lenationalmontreux.ch",
        contactAddress: "Avenue du Casino 10, 1820 Montreux",
        contactUrgent: "По срочным вопросам о существующих бронированиях, пожалуйста, связывайтесь с нами напрямую по электронной почте.",
        contactName: "Ваше имя",
        contactEmailPlaceholder: "Ваш адрес электронной почты",
        contactSubject: "Тема (например, запрос о доступности)",
        contactMessage: "Ваше сообщение…",
        contactSend: "Отправить сообщение",
        contactSuccess: "✓ Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в течение 24 часов.",

        // Check-in CTA
        checkinHeading: "Уже забронировали?",
        checkinDesc: "Завершите цифровую регистрацию и загрузите свои документы о путешествии перед прибытием для беспроблемного опыта.",
        checkinButton: "Перейти к регистрации",

        // Check-in page
        ciHeader: "Регистрация гостей и подписание документов",
        ciWelcomeTitle: "Добро пожаловать в Le National de Montreux",
        ciWelcomeDesc: "Эти короткие видео расскажут вам всё необходимое перед приездом — как добраться до апартаментов от вокзала Монтрё, как получить ключи и как попасть в частный гараж и Spa & Wellness-центр. Пожалуйста, посмотрите все три видео перед подписанием документов.",
        ciVideo1: "▶ Руководство по заезду — Часть 1",
        ciVideo2: "▶ Руководство по заезду — Часть 2",
        ciVideo3: "▶ Руководство по заезду — Часть 3",
        ciStartBtn: "Перейти к документам регистрации →",
        ciStep1: "Регистрация",
        ciStep2: "Правила здания",
        ciStep3: "Wellness & SPA",
        ciStep4: "Завершено",
        ciStep1Title: "Карточка регистрации / Meldeschein / Bulletin d'enregistrement",
        ciLabelApartment: "Апартаменты",
        ciLabelArrival: "Заезд",
        ciLabelDeparture: "Выезд",
        ciLabelName: "Фамилия, Имя / Surname, First Name",
        ciLabelStreet: "Улица, Номер / Street, Number",
        ciLabelCity: "Индекс, Город / ZIP, City",
        ciLabelPassport: "Номер паспорта / Passport Nr",
        ciLabelDob: "Дата рождения / Date of Birth",
        ciLabelNationality: "Национальность / Nationality",
        ciLabelAdults: "Взрослые (16+)",
        ciLabelChildren: "Дети (0–15)",
        ciPlaceholderName: "Полное имя",
        ciPlaceholderStreet: "Адрес",
        ciPlaceholderCity: "напр. 1820 Монтрё",
        ciPlaceholderPassport: "Номер паспорта",
        ciPlaceholderNationality: "Национальность",
        ciSigLabel: "Подпись / Signature",
        ciSigPlaceholder1: "Подпишите здесь мышью или пальцем",
        ciSigPlaceholder: "Подпишите здесь",
        ciClear: "Очистить",
        ciErrSig1: "Пожалуйста, поставьте подпись, чтобы продолжить.",
        ciErrSig: "Пожалуйста, поставьте подпись.",
        ciContinueBuilding: "Перейти к правилам здания →",
        ciStep2DownloadNote: "Скачать полный 21-страничный документ",
        ciAckBuilding: "Я подтверждаю, что прочитал(а) и понял(а) Правила пользования (Règlement d'administration et d'utilisation) совладения Le National de Montreux и обязуюсь соблюдать все его положения во время пребывания.",
        ciErrAckBuilding: "Пожалуйста, подтвердите, что вы прочитали правила здания.",
        ciBack: "← Назад",
        ciContinueWellness: "Перейти к правилам Wellness →",
        ciStep3DownloadNote: "Скачать полный документ",
        ciAckWellness: "Я подтверждаю, что прочитал(а) и понял(а) Правила пользования Wellness & SPA и обязуюсь соблюдать все положения во время пребывания в Le National de Montreux.",
        ciErrAckWellness: "Пожалуйста, подтвердите, что вы прочитали правила wellness.",
        ciCompleteCheckin: "✓ Завершить регистрацию",
        ciCompleteTitle: "Регистрация завершена!",
        ciCompleteDesc: "Спасибо. Все документы успешно подписаны.",
        ciDownloadPdf: "📥 Скачать PDF",
        ciPrint: "🖨️ Печать / Сохранить",
        ciViewSummary: "👁️ Просмотр сводки",
    },

    ar: {
        // Navigation
        navGallery: "المعرض",
        navApartment: "الشقة",
        navBook: "احجز",
        navLocation: "الموقع",
        navContact: "تواصل",
        navBookNow: "احجز الآن",

        // Hero
        heroLocation: "مونترو، سويسرا",
        heroPillBadge: "جديد",
        heroPillText: "حجز مباشر · أفضل الأسعار مضمونة",
        heroTitle: "Le National مونترو",
        heroSubtitle: "حياة فاخرة على ضفاف بحيرة جنيف",
        heroReserve: "احجز إقامتك",
        heroExplore: "استكشف الشقة",

        // Features Bar
        featureBedrooms: "غرفتا نوم · حتى ٨ ضيوف",
        featureViews: "إطلالات على البحيرة والجبال",
        featureFestival: "موقع مهرجان الجاز",
        featureRating: "٤٫٩ على Airbnb",
        featureAirport: "٥٥ دقيقة مطار جنيف",

        // Gallery
        galleryLabel: "معرض الصور",
        galleryTitle: "من داخل Le National",
        galleryViewAll: "عرض جميع الصور",

        // About
        aboutLabel: "الشقة",
        aboutTitle: "منزلك فوق بحيرة جنيف",
        aboutText1: "تقع شقة Le National في قلب مدينة مونترو، وهي شقة مفروشة بأناقة رفيعة توفر إطلالات بانورامية على بحيرة جنيف وجبال الألب. سواء أتيت لحضور مهرجان الجاز الشهير عالمياً، أو للاسترخاء في أحضان الجبال، أو للاستمتاع بسحر الريفييرا السويسرية، فهذا هو مقرك المثالي.",
        aboutText2: "تجمع الشقة بين الراحة العصرية والأناقة الخالدة — أسقف عالية، أثاث من تصميم راقٍ، مطبخ مجهز بالكامل، وتراس حيث يمكنك تناول قهوة الصباح وأنت تراقب لمعان البحيرة في الأسفل.",

        // Amenities
        amenityLakeViews: "إطلالة على البحيرة",
        amenityFullKitchen: "مطبخ متكامل",
        amenityWiFi: "واي فاي عالي السرعة",
        amenitySmartTV: "تلفزيون ذكي",
        amenityWasherDryer: "غسالة ومجفف",
        amenityAC: "تكييف وتدفئة",
        amenityTerrace: "تراس خاص",
        amenityLinens: "أغطية فاخرة",
        amenityKeyless: "دخول بلا مفتاح",
        amenityParking: "موقف سيارات خاص",
        amenitySpa: "دخول إلى السبا (مسبح، صالة رياضية، جاكوزي، حمام تركي، ساونا)",
        amenityBabyCot: "سرير أطفال متاح",

        // Booking
        bookingLabel: "حجز فوري",
        bookingTitle: "احجز تواريخك",
        bookingDesc: "اختر تواريخ الوصول والمغادرة أدناه. تتزامن التواريخ المتاحة في الوقت الفعلي مع تقويم Airbnb الخاص بنا. دفع آمن عبر Stripe. ستُحوَّل إلى صفحة إتمام الحجز.",
        bookingDetails: "تفاصيل الحجز",
        formCheckIn: "الوصول",
        formCheckOut: "المغادرة",
        formGuests: "الضيوف",
        formNights: "ليالٍ",
        formFirstName: "الاسم الأول",
        formLastName: "اسم العائلة",
        formEmail: "البريد الإلكتروني",
        formGuest1: "١ ضيف",
        formGuest2: "٢ ضيوف",
        formGuest3: "٣ ضيوف",
        formGuest4: "٤ ضيوف",
        formGuest5: "٥ ضيوف",
        formGuest6: "٦ ضيوف",
        priceLabel: "السعر × الليالي",
        priceCleaning: "رسوم التنظيف",
        priceTotal: "المجموع",
        btnProceedPayment: "المتابعة للدفع",
        bookingNote: "٣ ليالٍ كحد أدنى · إلغاء مجاني حتى ١٤ يوماً قبل الوصول",
        calLegendSelected: "المحدد",
        calLegendStay: "إقامتك",
        calLegendUnavailable: "غير متاح",
        calStatusSelect: "اختر تاريخ وصولك",

        // Reviews
        reviewsLabel: "تقييمات الضيوف",
        reviewsTitle: "ما يقوله الضيوف",
        reviewAuthor1: "— Sophie M.، باريس · يوليو ٢٠٢٥",
        reviewAuthor2: "— Marcus T.، لندن · يوليو ٢٠٢٥",
        reviewAuthor3: "— Ingrid L.، ستوكهولم · أغسطس ٢٠٢٥",
        reviewRatingLabel: "استثنائي",
        reviewRatingDesc: "تقييم ٤٫٩ من ٥ على Airbnb",
        reviewViewListing: "عرض الإعلان ←",

        // Location
        locationLabel: "موقعنا",
        locationTitle: "مونترو، الريفييرا السويسرية",
        locationDesc: "يقع Le National في وسط مدينة مونترو، على مقربة بالمشي من الكورنيش، والمطاعم الراقية، والمعالم السياحية العالمية.",
        locPromenade: "كورنيش بحيرة جنيف — ٣ دقائق سيراً",
        locFestival: "أماكن مهرجان الجاز — ٥ دقائق سيراً",
        locCastle: "قلعة شيون — ١٥ دقيقة بالقطار",
        locTrain: "محطة قطار مونترو — ٨ دقائق سيراً",
        locAirport: "مطار جنيف — ٥٥ دقيقة بالقطار",
        locSkiResort: "منتجع ليزان للتزلج — ٤٥ دقيقة بالسيارة",
        locDining: "مطاعم فاخرة — عدة خيارات ضمن دقيقتين",

        // Contact
        contactLabel: "تواصل معنا",
        contactTitle: "اتصل بنا",
        contactHeading: "يسعدنا سماعك",
        contactDesc: "هل لديك سؤال حول الشقة، التوفر، أو إقامتك القادمة؟ أرسل لنا رسالة وسنرد عليك خلال ٢٤ ساعة.",
        contactEmail: "info@lenationalmontreux.ch",
        contactAddress: "Avenue du Casino 10, 1820 Montreux",
        contactUrgent: "للاستفسارات العاجلة المتعلقة بحجز قائم، يرجى التواصل معنا مباشرة عبر البريد الإلكتروني.",
        contactName: "اسمك",
        contactEmailPlaceholder: "عنوان بريدك الإلكتروني",
        contactSubject: "الموضوع (مثلاً: استفسار عن التوفر)",
        contactMessage: "رسالتك…",
        contactSend: "إرسال الرسالة",
        contactSuccess: "✓ شكراً! تم إرسال رسالتك. سنتواصل معك خلال ٢٤ ساعة.",

        // Check-in CTA
        checkinHeading: "حجزت مسبقاً؟",
        checkinDesc: "أكمل تسجيل الوصول الرقمي وأرسل وثائق السفر قبل وصولك لتجربة سلسة.",
        checkinButton: "إلى تسجيل الوصول",

        // Check-in page
        ciHeader: "تسجيل وصول الضيوف وتوقيع الوثائق",
        ciWelcomeTitle: "مرحباً بكم في Le National de Montreux",
        ciWelcomeDesc: "تُرشدكم هذه الفيديوهات القصيرة إلى كل ما تحتاجون معرفته قبل وصولكم — كيفية الوصول إلى الشقة من محطة قطار مونترو، وكيفية استلام المفاتيح، والوصول إلى الكراج الخاص ومركز سبا والعافية. يرجى مشاهدة الفيديوهات الثلاثة قبل توقيع الوثائق.",
        ciVideo1: "▶ دليل تسجيل الوصول — الجزء ١",
        ciVideo2: "▶ دليل تسجيل الوصول — الجزء ٢",
        ciVideo3: "▶ دليل تسجيل الوصول — الجزء ٣",
        ciStartBtn: "المتابعة إلى وثائق تسجيل الوصول →",
        ciStep1: "التسجيل",
        ciStep2: "لوائح المبنى",
        ciStep3: "Wellness & SPA",
        ciStep4: "مكتمل",
        ciStep1Title: "نموذج تسجيل الوصول / Meldeschein / Bulletin d'enregistrement",
        ciLabelApartment: "الشقة",
        ciLabelArrival: "الوصول",
        ciLabelDeparture: "المغادرة",
        ciLabelName: "اللقب، الاسم / Surname, First Name",
        ciLabelStreet: "الشارع، الرقم / Street, Number",
        ciLabelCity: "الرمز البريدي، المدينة / ZIP, City",
        ciLabelPassport: "رقم جواز السفر / Passport Nr",
        ciLabelDob: "تاريخ الميلاد / Date of Birth",
        ciLabelNationality: "الجنسية / Nationality",
        ciLabelAdults: "البالغون (16+)",
        ciLabelChildren: "الأطفال (0–15)",
        ciPlaceholderName: "الاسم الكامل",
        ciPlaceholderStreet: "عنوان الشارع",
        ciPlaceholderCity: "مثال: 1820 Montreux",
        ciPlaceholderPassport: "رقم جواز السفر",
        ciPlaceholderNationality: "الجنسية",
        ciSigLabel: "التوقيع / Signature",
        ciSigPlaceholder1: "وقّع هنا بالماوس أو بإصبعك",
        ciSigPlaceholder: "وقّع هنا",
        ciClear: "مسح",
        ciErrSig1: "يرجى تقديم توقيعك للمتابعة.",
        ciErrSig: "يرجى تقديم توقيعك.",
        ciContinueBuilding: "المتابعة إلى لوائح المبنى →",
        ciStep2DownloadNote: "تنزيل الوثيقة الكاملة المكونة من 21 صفحة",
        ciAckBuilding: "أؤكد أنني قرأت وفهمت لوائح الإدارة والاستخدام (Règlement d'administration et d'utilisation) لمشاركة الملكية Le National de Montreux، وأوافق على الالتزام بجميع أحكامها خلال إقامتي.",
        ciErrAckBuilding: "يرجى تأكيد أنك قرأت لوائح المبنى.",
        ciBack: "→ رجوع",
        ciContinueWellness: "المتابعة إلى لوائح Wellness →",
        ciStep3DownloadNote: "تنزيل الوثيقة الكاملة",
        ciAckWellness: "أؤكد أنني قرأت وفهمت لوائح مرافق Wellness & SPA وأوافق على الالتزام بجميع أحكامها خلال إقامتي في Le National de Montreux.",
        ciErrAckWellness: "يرجى تأكيد أنك قرأت لوائح الـ Wellness.",
        ciCompleteCheckin: "✓ إتمام تسجيل الوصول",
        ciCompleteTitle: "اكتمل تسجيل الوصول!",
        ciCompleteDesc: "شكراً. تم توقيع جميع الوثائق بنجاح.",
        ciDownloadPdf: "📥 تنزيل PDF",
        ciPrint: "🖨️ طباعة / حفظ",
        ciViewSummary: "👁️ عرض الملخص",
    },

    zh: {
        // Navigation
        navGallery: "画廊",
        navApartment: "公寓",
        navBook: "预订",
        navLocation: "位置",
        navContact: "联系",
        navBookNow: "立即预订",

        // Hero
        heroLocation: "蒙特勒，瑞士",
        heroPillBadge: "新",
        heroPillText: "直接预订 · 保证最优价格",
        heroTitle: "Le National 蒙特勒",
        heroSubtitle: "日内瓦湖畔的豪华生活",
        heroReserve: "预订您的住宿",
        heroExplore: "探索公寓",

        // Features Bar
        featureBedrooms: "2间卧室 · 最多8位客人",
        featureViews: "湖景和山景",
        featureFestival: "爵士音乐节地点",
        featureRating: "Airbnb评分4.9",
        featureAirport: "日内瓦机场55分钟",

        // Gallery
        galleryLabel: "照片库",
        galleryTitle: "National内部",
        galleryViewAll: "查看全部照片",

        // About
        aboutLabel: "公寓",
        aboutTitle: "您在日内瓦湖上的家",
        aboutText1: "Le National坐落在蒙特勒中心，是一套设计精美的公寓，可俯瞰日内瓦湖和阿尔卑斯山的壮丽景色。无论您是来参加世界著名的爵士音乐节、山地度假，还是只是想体验瑞士里维埃拉的魅力，这都是您的完美基地。",
        aboutText2: "公寓融合了当代舒适和永恒的优雅——高天花板、设计师家具、完整配备的厨房，以及一个露台，您可以在那里一边品咖啡，一边欣赏下方波光粼粼的湖面。",

        // Amenities
        amenityLakeViews: "湖景",
        amenityFullKitchen: "厨房设备完整",
        amenityWiFi: "高速WiFi",
        amenitySmartTV: "智能电视",
        amenityWasherDryer: "洗衣机/烘干机",
        amenityAC: "空调和供暖",
        amenityTerrace: "私人露台",
        amenityLinens: "高级床上用品",
        amenityKeyless: "无钥匙进出",
        amenityParking: "私人停车位",
        amenitySpa: "水疗馆可用（游泳池、健身房、按摩浴缸、土耳其浴、桑拿）",
        amenityBabyCot: "有婴儿床",

        // Booking
        bookingLabel: "即时预订",
        bookingTitle: "预订您的日期",
        bookingDesc: "选择下方的入住和退房日期。可用性与我们的Airbnb日历实时同步。通过Stripe进行安全支付。您将被重定向以完成预订。",
        bookingDetails: "预订详情",
        formCheckIn: "入住",
        formCheckOut: "退房",
        formGuests: "客人",
        formNights: "晚数",
        formFirstName: "名字",
        formLastName: "姓氏",
        formEmail: "电子邮件地址",
        formGuest1: "1位客人",
        formGuest2: "2位客人",
        formGuest3: "3位客人",
        formGuest4: "4位客人",
        formGuest5: "5位客人",
        formGuest6: "6位客人",
        priceLabel: "价格×晚数",
        priceCleaning: "清洁费",
        priceTotal: "总计",
        btnProceedPayment: "进行支付",
        bookingNote: "最少3晚 · 入住前14天内免费取消",
        calLegendSelected: "已选择",
        calLegendStay: "您的住宿",
        calLegendUnavailable: "不可用",
        calStatusSelect: "选择您的入住日期",

        // Reviews
        reviewsLabel: "客人评价",
        reviewsTitle: "客人怎么说",
        reviewAuthor1: "— Sophie M., 巴黎 · 2025年7月",
        reviewAuthor2: "— Marcus T., 伦敦 · 2025年7月",
        reviewAuthor3: "— Ingrid L., 斯德哥尔摩 · 2025年8月",
        reviewRatingLabel: "卓越",
        reviewRatingDesc: "在Airbnb上的评分为4.9分（满分5分）",
        reviewViewListing: "查看列表 →",

        // Location
        locationLabel: "我们的位置",
        locationTitle: "蒙特勒，瑞士里维埃拉",
        locationDesc: "Le National位于蒙特勒中心，步行距离内可到达湖滨漫步道、美食餐厅和世界级景点。",
        locPromenade: "日内瓦湖滨漫步道 — 步行3分钟",
        locFestival: "爵士音乐节场地 — 步行5分钟",
        locCastle: "希永城堡 — 火车15分钟",
        locTrain: "蒙特勒火车站 — 步行8分钟",
        locAirport: "日内瓦机场 — 火车55分钟",
        locSkiResort: "莱森滑雪场 — 驾车45分钟",
        locDining: "高级餐饮 — 多家餐厅在2分钟内",

        // Contact
        contactLabel: "联系我们",
        contactTitle: "联系方式",
        contactHeading: "我们很高兴听到您的声音",
        contactDesc: "对公寓、可用性或即将到来的住宿有疑问？给我们留言，我们将在24小时内回复您。",
        contactEmail: "info@lenationalmontreux.ch",
        contactAddress: "Avenue du Casino 10, 1820 Montreux",
        contactUrgent: "对于现有预订的紧急问题，请直接通过电子邮件与我们联系。",
        contactName: "您的名字",
        contactEmailPlaceholder: "您的电子邮件地址",
        contactSubject: "主题（例如可用性查询）",
        contactMessage: "您的信息…",
        contactSend: "发送信息",
        contactSuccess: "✓ 谢谢！您的信息已发送。我们将在24小时内与您联系。",

        // Check-in CTA
        checkinHeading: "已经预订？",
        checkinDesc: "在到达之前完成您的数字入住手续并上传您的旅行文件，以获得无缝的体验。",
        checkinButton: "进行入住",

        // Check-in page
        ciHeader: "宾客入住登记及文件签署",
        ciWelcomeTitle: "欢迎来到 Le National de Montreux",
        ciWelcomeDesc: "这些简短的视频将带您了解抵达前需要知道的一切 — 如何从蒙特勒火车站到达公寓、如何领取钥匙，以及如何进入私人车库和 Spa & 健康中心。请在签署文件之前观看所有三个视频。",
        ciVideo1: "▶ 入住指南 — 第 1 部分",
        ciVideo2: "▶ 入住指南 — 第 2 部分",
        ciVideo3: "▶ 入住指南 — 第 3 部分",
        ciStartBtn: "前往入住文件 →",
        ciStep1: "登记",
        ciStep2: "楼栋规则",
        ciStep3: "Wellness & SPA",
        ciStep4: "完成",
        ciStep1Title: "入住登记表 / Meldeschein / Bulletin d'enregistrement",
        ciLabelApartment: "公寓",
        ciLabelArrival: "入住日期",
        ciLabelDeparture: "退房日期",
        ciLabelName: "姓名 / Surname, First Name",
        ciLabelStreet: "街道、门牌号 / Street, Number",
        ciLabelCity: "邮编、城市 / ZIP, City",
        ciLabelPassport: "护照号 / Passport Nr",
        ciLabelDob: "出生日期 / Date of Birth",
        ciLabelNationality: "国籍 / Nationality",
        ciLabelAdults: "成人 (16+)",
        ciLabelChildren: "儿童 (0–15)",
        ciPlaceholderName: "全名",
        ciPlaceholderStreet: "街道地址",
        ciPlaceholderCity: "例如：1820 蒙特勒",
        ciPlaceholderPassport: "护照号码",
        ciPlaceholderNationality: "国籍",
        ciSigLabel: "签名 / Signature",
        ciSigPlaceholder1: "请用鼠标或手指在此签名",
        ciSigPlaceholder: "请在此签名",
        ciClear: "清除",
        ciErrSig1: "请提供签名以继续。",
        ciErrSig: "请提供签名。",
        ciContinueBuilding: "继续查看楼栋规则 →",
        ciStep2DownloadNote: "下载阅读完整的 21 页文件",
        ciAckBuilding: "我确认已阅读并理解 Le National de Montreux 共有产权的管理和使用规则（Règlement d'administration et d'utilisation），并同意在住宿期间遵守所有规定。",
        ciErrAckBuilding: "请确认您已阅读楼栋规则。",
        ciBack: "← 返回",
        ciContinueWellness: "继续查看 Wellness 规则 →",
        ciStep3DownloadNote: "下载阅读完整文件",
        ciAckWellness: "我确认已阅读并理解 Wellness & SPA 设施规则，并同意在 Le National de Montreux 住宿期间遵守所有规定。",
        ciErrAckWellness: "请确认您已阅读健康规则。",
        ciCompleteCheckin: "✓ 完成入住",
        ciCompleteTitle: "入住完成！",
        ciCompleteDesc: "感谢您。所有文件均已成功签署。",
        ciDownloadPdf: "📥 下载 PDF",
        ciPrint: "🖨️ 打印 / 保存",
        ciViewSummary: "👁️ 查看摘要",
    },
};

// Language switcher logic
function setLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    updatePageLanguage(lang);
    updateLanguageSwitcher(lang);
}

function getLanguage() {
    return localStorage.getItem('preferredLanguage') || 'en';
}

function updatePageLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    // Update text content using data attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            el.placeholder = t[key];
        }
    });

    // Update attributes
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        const key = el.getAttribute('data-i18n-attr');
        const attr = el.getAttribute('data-i18n-attr-name');
        if (t[key]) {
            el.setAttribute(attr, t[key]);
        }
    });

    // Update select options
    updateSelectOptions(lang);

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

function updateLanguageSwitcher(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Wire up language buttons immediately via event delegation (CSP-safe, no inline onclick needed)
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (btn) {
        const targetLang = btn.getAttribute('data-lang');
        if (targetLang) setLanguage(targetLang);
    }
});

// Initialize language on page load and attach click listeners directly to each button
document.addEventListener('DOMContentLoaded', () => {
    const lang = getLanguage();
    updatePageLanguage(lang);
    updateLanguageSwitcher(lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetLang = btn.getAttribute('data-lang');
            if (targetLang) setLanguage(targetLang);
        });
    });
});

// Update select options based on language
function updateSelectOptions(lang) {
    const t = translations[lang];
    if (!t) return;

    const guestSelect = document.getElementById('inputGuests');
    if (guestSelect) {
        const options = guestSelect.querySelectorAll('option');
        options.forEach(option => {
            const key = option.getAttribute('data-i18n');
            if (key && t[key]) {
                option.textContent = t[key];
            }
        });
    }
}
