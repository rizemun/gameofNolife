
const registration = {
    init: function() {
        this.cache();
        this.events();
        this.formValidateInit();
    },

    cache: function() {
        this.settings = {
            formClass: 'registration',
            submitClass: 'registration__button',
            toggleForm: 'auth-registration__button',
            formClass1: '',
        };

        this.$form = $('.'+this.settings.formClass);
        this.$toggleformButton = $('.'+this.settings.toggleForm);
    },

    events: function() {
        this.$form.on('submit', (ev)=>this.onFormSubmit());
        this.$toggleformButton.on('click', (ev)=>this.onToggleFormButton(ev))
    },

    onToggleFormButton: function(ev) {
        this.$toggleformButton.removeClass('_active');
        const pressedButton = $(ev.target);
        pressedButton.addClass('_active');
        const formIdToShow = pressedButton.data('shownId');
        this.$form.addClass('_hidden');
        $('#'+formIdToShow).removeClass('_hidden');
    },

    onFormSubmit: function() {
        console.log('sended!')
    },

    formValidateInit: function () {

        console.log(this.$form);
        this.$form.validate({
            rules: {
                login: {
                    required: true,
                    maxlength: 30
                },
                password: {
                    required: true,
                    maxlength: 30
                },
                email: {
                    required: true,
                    maxlength: 50
                },
                nickname: {
                    required: true,
                    maxlength: 30
                },
            },

            messages: {
                login: {
                    required: 'Введите логин,пожалуйста',
                    maxlength: 'Логин сожержит максимум 30 символов'
                },
                password: {
                    required: 'Введите пароль,пожалуйста',
                    maxlength: 'Пароль сожержит максимум 30 символов'
                },
                email: {
                    required: 'Введите электронную почту,пожалуйста',
                    maxlength: 'Адрес почты сожержит максимум 50 символов',
                    email: 'Введите корректный адрес почты'
                },
                nickname: {
                    required: 'Введите имя аккаунта,пожалуйста',
                    maxlength: 'Ник сожержит максимум 30 символов'
                },
            },


        });
    }
};





$(function () {

    registration.init();

});