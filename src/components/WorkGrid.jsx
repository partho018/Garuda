import React from 'react';
import './WorkGrid.css';

const WorkGrid = ({ img1, img2, img3, img4, img5, img6 }) => {
    const row1 = [
        {
            id: 'r1-1',
            logo: "Affine",
            title: "Robust and long-term LRTs powered by Affine Risk Engine",
            bgColor: "#E2F4E9",
            textColor: "light",
            img: img1,
            type: "standard"
        },
        {
            id: 'r1-2',
            logo: "Gummiz",
            title: "Joyful gummy candies that make you smile",
            bgColor: "#FFF4E6",
            textColor: "dark",
            img: img2,
            type: "full-img"
        },
        {
            id: 'r1-3',
            logo: "The Gridline",
            title: "Minimalist wood crafting and structural elegance",
            bgColor: "#FBF9F6",
            textColor: "dark",
            img: img3,
            type: "wood-card"
        }
    ];

    const row2 = [
        {
            id: 'r2-1',
            logo: "Alpine Empower",
            title: "Empower Your Finances with Alpine Banking",
            bgColor: "#EBF2FF",
            textColor: "light",
            img: img4,
            type: "standard"
        },
        {
            id: 'r2-2',
            logo: "Yenex",
            title: "Connect with distributed energy creators",
            bgColor: "#0B132B",
            textColor: "dark",
            img: img5,
            type: "standard"
        },
        {
            id: 'r2-3',
            logo: "Zinggo",
            title: "Bite Boom Zinggo - Redefining fast food",
            bgColor: "#FFF0F2",
            textColor: "dark",
            img: img6,
            type: "full-img"
        }
    ];

    // Duplicate arrays 3 times to make infinite scroll smooth without gaps
    const row1Items = [...row1, ...row1, ...row1];
    const row2Items = [...row2, ...row2, ...row2];

    const renderCard = (work, idx) => {
        const isDarkText = work.textColor === "light";
        const isFullImg = work.type === "full-img";
        const isWood = work.type === "wood-card";
        
        return (
            <div 
                key={`${work.id}-${idx}`}
                className={`work-card ${isFullImg ? 'full-img' : ''} ${isWood ? 'wood-card' : ''}`}
                style={{ backgroundColor: work.bgColor }}
            >
                <div className="work-card-info">
                    <div className={`work-card-logo ${!isDarkText || isFullImg ? 'dark' : ''}`}>
                        <span className="work-card-logo-dot" />
                        {work.logo}
                    </div>
                    <h3 className={`work-card-title ${!isDarkText || isFullImg ? 'dark' : ''}`}>
                        {work.title}
                    </h3>
                </div>

                <div className="work-card-visual">
                    {isFullImg && <div className="work-card-overlay" />}
                    <img 
                        src={work.img} 
                        alt={work.logo} 
                        className="work-card-img" 
                        loading="lazy" 
                        decoding="async" 
                    />
                </div>
            </div>
        );
    };

    return (
        <section className="work-grid-section">
            <div className="work-grid-container">
                {/* Row 1: Scrolling Left */}
                <div className="work-marquee-row">
                    <div className="work-marquee-track left">
                        {row1Items.map((work, idx) => renderCard(work, idx))}
                    </div>
                </div>

                {/* Row 2: Scrolling Right */}
                <div className="work-marquee-row">
                    <div className="work-marquee-track right">
                        {row2Items.map((work, idx) => renderCard(work, idx))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(WorkGrid);
