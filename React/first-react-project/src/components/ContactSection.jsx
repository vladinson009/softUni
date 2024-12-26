


export default function ContactSection() {

    return (
        <section>
            <form className="recipe-form form" method="POST">
                <h2>Contact Form</h2>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" placeholder="John Doe" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="text" placeholder="JohnDoe@abv.bg" />
                </div>
                <div>
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" type="text" placeholder="type your message here..." />
                </div>
                <input className="btn" type="submit" value='Send' />
            </form>
        </section>
    )
}