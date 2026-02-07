<template>
    <div class="w-full p-8 flex-col items-center bg-teal-500">
        <h1 class="font-bold text-xl my-2 text-center text-teal-200">VIAÇÃO PARANAENSE</h1>
        <div class="flex-col text-white">
            <p>(42) 98765-4321</p>
            <p>contato@viacaoparanaense.com</p>         
        </div>
        <div class="gap-4 justify-center flex p-8">
            <a href="">
                <IconsWhatsApp />
            </a>
            <a href="">
                <IconsInstagram />
            </a>
            <a href="">
                <IconsFacebook />
            </a>
        </div>
        <div class="flex flex-col items-center">
            <span class="text-white text-center">© {{ new Date().getFullYear() }} - Viação Paranaense</span>
            <span class="text-white text-center"> Desenvolvido por <a href="">AndrewNation</a></span>
        </div>
    </div>
</template>

<script setup>
import { Camera } from 'lucide-vue-next';
</script>