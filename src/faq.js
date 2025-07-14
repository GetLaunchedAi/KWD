const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'));
        for (const item of faqItems) {
            const onClick = () => {
            item.classList.toggle('active')
            console.log("clicked")
        }
        item.addEventListener('click', onClick)
        }
                                