export const DATA = {
    pt: {
        nav: [
            { name: "Sobre", href: "#about" },
            { name: "Habilidades", href: "#skills" },
            { name: "Experiência", href: "#experience" },
            { name: "Projetos", href: "#projects" },
            { name: "Formação", href: "#education" },
            { name: "Contato", href: "#contact" },
        ],
        hero: {
            greeting: "user@brendo:~$",
            name: "whoami",
            role: "Brendo Bittencourt",
            description: "Estatística | Linux | Automação",
            badge: "Status: DISPONÍVEL",
            ctaPrimary: "Executar Projeto",
            ctaSecondary: "Acessar Logs"
        },
        experience: {
            title: "Experiência Profissional",
            items: [
                {
                    company: "Efetiva Distribuição",
                    role: "Analista de Dados Junior",
                    period: "01/2024 - 01/2026",
                    logo: "/logos/efetiva.png",
                    context: "Ambiente corporativo em fase de consolidação sistêmica após a recente implantação de um ERP, no qual dados operacionais passaram a ser centrais para decisões logísticas, financeiras e comerciais. Ao longo desse período, tornei-me a principal referência técnica e funcional do sistema dentro da empresa.",
                    action: "Fui responsável por toda a camada analítica da empresa, realizando análises diárias, consultas avançadas em banco de dados SQL Server, validações no Power BI e desenvolvimento de automações que integravam ERP, banco de dados, scripts em Python e Shell, infraestrutura em nuvem AWS e disponibilização de informações para diferentes setores.",
                    learning: "Essa experiência exigiu uma compreensão profunda do negócio como um todo — impostos, finanças, supply chain, logística e área comercial — e consolidou minha visão de como dados, sistemas e automação se tornam peças centrais para sustentar operações reais em crescimento.",
                    stack: ["Python", "SQL Server", "Power BI", "Excel Intermediário", "AWS", "Shell Script", "ERP"],
                },
                {
                    company: "Sagrada Magia",
                    role: "Analista Administrativo",
                    period: "10/2021 - 09/2023",
                    logo: "/logos/sagrada-magia.png",
                    context: "Ambiente de e-commerce com grande alcance digital, utilizando o Instagram como principal canal de aquisição e o site como ponto central de conversão. Apesar de uma presença visual e de marketing altamente profissional, os processos internos eram majoritariamente manuais, sustentados por um time pequeno.",
                    action: "Atuei diretamente na manutenção e operação do site, automação de entrada e saída de ativos, controle de estoque, gestão de um ERP simples, no qual tinha autonomia total para ajustes e melhorias. Busquei automatizar processos operacionais sempre que possível, reduzindo tarefas manuais e aumentando a confiabilidade das informações.",
                    learning: "Essa experiência consolidou minha visão sobre como negócios digitalmente sofisticados podem ser operacionalmente frágeis quando processos e dados não acompanham o crescimento, e o impacto que automação e organização de dados têm na qualidade das decisões.",
                    stack: ["E-commerce", "Automação Operacional", "ERP", "Gestão de Estoque", "Dados Operacionais"]
                },
                {
                    company: "BRW Corporativo",
                    role: "Assistente Administrativo",
                    period: "10/2018 - 09/2021",
                    logo: "/logos/brw.png",
                    context: "Empresa de representação comercial de móveis, atuando como ponte entre fábricas do Sul e Sudeste e clientes no Nordeste, com operações amplas e alto volume de negociações, sustentadas por uma equipe pequena e processos majoritariamente manuais.",
                    action: "Atuei no suporte operacional da empresa, lidando com organização de informações comerciais, financeiras e logísticas por meio de ferramentas tradicionais como Excel, Word e PowerPoint, além da administração básica de sistemas internos e criação e manutenção de sites.",
                    learning: "Em um ambiente sem automação ou ferramentas modernas, desenvolvi uma forte noção de processos, organização e responsabilidade, aprendendo na prática como sistemas corporativos funcionam (ou falham) quando dependem exclusivamente de esforço manual e comunicação informal.",
                    stack: ["Excel", "Word", "PowerPoint", "Organização Operacional", "Sistemas Corporativos"]
                },
                {
                    company: "RETEC Residuos",
                    role: "Jovem Aprendiz",
                    period: "07/2015 - 07/2016",
                    logo: "/logos/retec.png",
                    context: "Primeira experiência profissional, voltada à introdução no ambiente corporativo e aos processos básicos do mundo do trabalho, com foco em organização, responsabilidade e convivência profissional.",
                    action: "Atuei em atividades administrativas como cadastro de clientes, atualização de produtos em sistemas internos, organização de informações em planilhas e arquivamento de documentos físicos, utilizando ferramentas básicas como Excel e sistemas corporativos simples.",
                    learning: "Essa experiência foi fundamental para desenvolver noções de processo, rotina e trabalho em equipe, além de consolidar minha familiaridade inicial com computadores, sistemas e o uso prático de ferramentas digitais no dia a dia profissional.",
                    stack: ["Excel", "Sistemas Básicos", "Processos Administrativos"]
                },
            ]
        },
        education: {
            title: "Formação Acadêmica",
            items: [
                {
                    institution: "Descomplica Faculdade Digital",
                    degree: "Tecnólogo em Ciência de Dados",
                    period: "2024 - 2026",
                    description: "Ênfase em prática aplicada e ferramentas",
                    logo: "/logos/descomplica-faculdade.png",
                },
                {
                    institution: "UNIFACS - Universidade Salvador",
                    degree: "Bacharelado em Estatística",
                    period: "2024 - 2028",
                    description: "Especialização em base matemática e inferência",
                    logo: "/logos/unifacs.png",
                },
            ]
        },
        skills: {
            title: "Habilidades & Diferenciais",
            subtitle: "Stack técnica organizada por área de atuação",
            groups: [
                { category: "Desenvolvimento" },
                { category: "Dados & Infra" },
                { category: "Diferenciais" }
            ]
        },
        projects: {
            title: "Projetos em Destaque",
            items: [
                {
                    title: "Dashboard Operacional",
                    description: "Dashboard desenvolvido para apoiar decisões operacionais diárias em ambiente ERP, com foco em confiabilidade, validação cruzada e redução de erro humano",
                    tech: ["SQL Server", "PowerBI", "PowerShell", "Excel"],
                    link: "#",
                },
                {
                    title: "Pipeline de Dados",
                    description: "Pipeline de dados desenvolvido para extrair, transformar e disponibilizar informações operacionais a partir de um ERP, garantindo consistência, rastreabilidade e disponibilidade para múltiplos setores.",
                    tech: ["ERP", "Python", "SQL", "Cloud", "Shell"],
                    link: "#",
                },
                {
                    title: "Lore Neural Agents",
                    description: "Simulador experimental para estudar decisões humanas sob restrições extremas, comparando políticas humanas e algoritmos em ambientes controlados.",
                    tech: ["Python", "Shell", "SQL", "Rust"],
                    link: "https://github.com/brdneo/lore",
                },
            ]
        },
        footer: {
            title: "Focado em desenvolver soluções confiáveis e baseadas em dados.",
            subtitle: "Atualmente disponível para novas oportunidades e colaborações.",
            ctaPrimary: "Me envie um Email",
            ctaSecondary: "LinkedIn",
            copyright: "© 2026 Brendo. Todos os direitos reservados."
        }
    },
    en: {
        nav: [
            { name: "About", href: "#about" },
            { name: "Skills", href: "#skills" },
            { name: "Experience", href: "#experience" },
            { name: "Projects", href: "#projects" },
            { name: "Education", href: "#education" },
            { name: "Contact", href: "#contact" },
        ],
        hero: {
            greeting: "user@brendo:~$",
            name: "whoami",
            role: "Brendo Bittencourt",
            description: "Statistics | Linux | Automation",
            badge: "Status: AVAILABLE",
            ctaPrimary: "Execute Project",
            ctaSecondary: "Access Logs"
        },
        experience: {
            title: "Work Experience",
            items: [
                {
                    company: "Efetiva Distribuição",
                    role: "Data Analyst Junior",
                    period: "01/2024 - 01/2026",
                    logo: "/logos/efetiva.png",
                    context: "Corporate environment in a systemic consolidation phase after the recent implementation of an ERP, where operational data became central to logistical, financial, and commercial decisions. Throughout this period, I became the main technical and functional system reference within the company.",
                    action: "Responsible for the entire analytical layer of the company, performing daily analyses, advanced SQL Server queries, Power BI validations, and developing automations that integrated ERP, databases, Python and Shell scripts, AWS cloud infrastructure, and information delivery across sectors.",
                    learning: "This experience required a deep understanding of the business as a whole — taxes, finance, supply chain, logistics, and sales — and consolidated my view on how data, systems, and automation become central pieces to sustain real growing operations.",
                    stack: ["Python", "SQL Server", "Power BI", "Intermediate Excel", "AWS", "Shell Script", "ERP"],
                },
                {
                    company: "Sagrada Magia",
                    role: "Administrative Analyst",
                    period: "10/2021 - 09/2023",
                    logo: "/logos/sagrada-magia.png",
                    context: "E-commerce environment with significant digital reach, using Instagram as the primary acquisition channel and the website as the central conversion point. Despite a highly professional visual and marketing presence, internal processes were mostly manual, supported by a small team.",
                    action: "Directly worked on website maintenance and operation, asset entry/exit automation, inventory control and management of a simple ERP, where I had full autonomy for adjustments and improvements. I sought to automate operational processes whenever possible, reducing manual tasks and increasing information reliability.",
                    learning: "This experience consolidated my view on how digitally sophisticated businesses can be operationally fragile when processes and data don't keep up with growth, and the impact that automation and data organization have on decision quality.",
                    stack: ["E-commerce", "Operational Automation", "ERP", "Inventory Management", "Operational Data"]
                },
                {
                    company: "BRW Corporativo",
                    role: "Administrative Assistant",
                    period: "10/2018 - 09/2021",
                    logo: "/logos/brw.png",
                    context: "Furniture commercial representation company, acting as a bridge between manufacturers in the South/Southeast and clients in the Northeast, with extensive operations and high negotiation volume, supported by a small team and mostly manual processes.",
                    action: "Worked in operational support, dealing with the organization of commercial, financial, and logistical information using traditional tools like Excel, Word, and PowerPoint, in addition to basic internal system administration and website creation/maintenance.",
                    learning: "In an environment without automation or modern tools, I developed a strong sense of processes, organization, and responsibility, learning manually how corporate systems work (or fail) when relying exclusively on manual effort and informal communication.",
                    stack: ["Excel", "Word", "PowerPoint", "Operational Organization", "Corporate Systems"]
                },
                {
                    company: "RETEC Residuos",
                    role: "Apprentice",
                    period: "07/2015 - 07/2016",
                    logo: "/logos/retec.png",
                    context: "First professional experience, aimed at introducing the corporate environment and basic work processes, focusing on organization, responsibility, and professional conduct.",
                    action: "Worked on administrative activities such as customer registration, product updates in internal systems, organizing information in spreadsheets, and filing physical documents, using basic tools like Excel and simple corporate systems.",
                    learning: "This experience was fundamental to developing notions of process, routine, and teamwork, as well as consolidating my initial familiarity with computers, systems, and the practical use of digital tools in daily professional life.",
                    stack: ["Excel", "Basic Systems", "Administrative Processes"]
                },
            ]
        },
        education: {
            title: "Education",
            items: [
                {
                    institution: "Descomplica Faculdade Digital",
                    degree: "Technologist in Data Science",
                    period: "2024 - 2026",
                    description: "Emphasis on applied practice and tools",
                    logo: "/logos/descomplica-faculdade.png",
                },
                {
                    institution: "UNIFACS - Universidade Salvador",
                    degree: "Bachelor's Degree in Statistics",
                    period: "2024 - 2028",
                    description: "Specialization in mathematical foundations and inference.",
                    logo: "/logos/unifacs.png",
                },
            ]
        },
        skills: {
            title: "Skills & Differentials",
            subtitle: "Technical stack organized by area of expertise",
            groups: [
                { category: "Development" },
                { category: "Data & Infra" },
                { category: "Differentials" }
            ]
        },
        projects: {
            title: "Featured Projects",
            items: [
                {
                    title: "Operational Decision Dashboard",
                    description: "Dashboard developed to support daily operational decisions in ERP environment, focusing on reliability, cross-validation and human error reduction.",
                    tech: ["SQL Server", "PowerBI", "PowerShell", "Excel"],
                    link: "#",
                },
                {
                    title: "Data Pipeline",
                    description: "Data pipeline developed to extract, transform and provide operational information from an ERP, ensuring consistency, traceability and availability for multiple sectors.",
                    tech: ["ERP", "Python", "SQL", "Cloud", "Shell"],
                    link: "#",
                },
                {
                    title: "Lore Neural Agents",
                    description: "Experimental simulator to study human decisions under extreme constraints, comparing human policies and algorithms in controlled environments.",
                    tech: ["Python", "Shell", "SQL", "Rust"],
                    link: "https://github.com/brdneo/lore",
                },
            ]
        },
        footer: {
            title: "Focused on building reliable systems and data-driven solutions.",
            subtitle: "Currently available for new opportunities and collaborations.",
            ctaPrimary: "Email Me",
            ctaSecondary: "LinkedIn",
            copyright: "© 2026 Brendo. All rights reserved."
        }
    }
};
