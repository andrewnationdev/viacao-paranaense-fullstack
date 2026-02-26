<template>
    <div class="w-full p-8 flex flex-col items-center bg-blue-800">
        <h1 class="font-bold text-xl my-2 text-center text-teal-200">VIAÇÃO PARANAENSE</h1>
        <div class="flex-col text-white">
            <p>{{WEBSITE.contact.phone_number}}</p>
            <p>{{WEBSITE.contact.email}}</p>
        </div>
        <div class="flex flex-col items-center mt-6 text-white text-center gap-2">
            <a href="https://www.gov.br/antt/pt-br" class="hover:underline">Agência Nacional de Transportes Terrestres (ANTT)</a>
            <a href="https://www.gov.br/antt/pt-br/assuntos/passageiros/viajantes/direitos-e-deveres" class="hover:underline">Direitos e Deveres dos Passageiros</a>
        </div>
        <div class="gap-4 justify-center flex p-8">
            <a :href="WEBSITE.contact.social.whatsapp">
                <IconsWhatsApp />
            </a>
            <a :href="WEBSITE.contact.social.instagram">
                <IconsInstagram />
            </a>
            <a :href="WEBSITE.contact.social.facebook">
                <IconsFacebook />
            </a>
        </div>
        <div class="flex flex-col items-center">
            <span class="text-white text-center">© {{ new Date().getFullYear() }} - {{WEBSITE.contact.footer_title}}</span>
            <span class="text-white text-center"> Desenvolvido por <a class="hover:underline"
                    href="https://andrewnationdev.vercel.app/">AndrewNation</a></span>
        </div>
    </div>
</template>

<script setup>
import { Camera } from 'lucide-vue-next';
import { WEBSITE } from '../utils/website.config.ts';
</script>