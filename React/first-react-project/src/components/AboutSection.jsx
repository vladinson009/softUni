

export default function AboutSection() {

    return (
        <section>
            <div className="about-us">
                <h1>Our Mission</h1>
                <p>We are trying to keep you up to date with actual cooking recipes</p>
                <p>Meet Our Team</p>
                <div className="our-team">

                    <div className="team-member">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNM1UUcNv1opC3O3p-Rhjbqjv0y1n6t0PF_A&s" alt="Team Member" />
                        <h2>John Doe</h2>
                        <p>Founder & CEO</p>
                    </div>

                    <div className="team-member">
                        <img src="https://t4.ftcdn.net/jpg/08/76/82/79/360_F_876827984_CtzX5kjJspyYeH8B6uEZkZW0OWZ8Jt3L.jpg" alt="Team Member" />
                        <h2>Jane Smith</h2>
                        <p>Chief Technology Officer</p>

                    </div>

                    <div className="team-member">
                        <img src="https://cgfaces.com/collection/preview/babb2567-9f94-4b8b-a516-366ef18cf2ef.jpg" alt="Team Member" />
                        <h2>Emil Brown</h2>
                        <p>Marketing Manager</p>
                    </div>

                </div>

            </div>

        </section>
    )
}