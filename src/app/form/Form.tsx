'use client';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const formSchema = z.object({
    name: z.string().min(1, { message: "Nome obrigatório" }),
    content: z.string().min(1, { message: "Conteúdo obrigatório" }),
    urgency: z.string(),
    priority: z.string(),
})

export default function FormContent() {
    const [token, setToken] = useState('');

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch('http://192.168.7.114/glpi/apirest.php/initSession/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'App-Token': 'mU597Gm8DDr3FskLzvMeZ5oLb7BnNVefIe2F9dXz',
                        'Authorization': `user_token yJwbpLv5GpGrvMoz0KYbOKgjc4pUlBhNrXFUrCiQ`
                        // 'Authorization': `Basic Smhpb25hdGhhbjpKaGlvbjgxMjQ=`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const dataToken = await response.json();
                console.log(dataToken);
                const sessionToken = dataToken.session_token;
                setToken(sessionToken);
            } catch (error) {
                console.error(error);
            }
        };

        fetchToken();
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            content: "",
            urgency: "3",
            priority: "3",
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data)
        const response = await fetch('http://192.168.7.114/glpi/apirest.php/Ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'App-Token': 'mU597Gm8DDr3FskLzvMeZ5oLb7BnNVefIe2F9dXz',
                // 'Session-Token': '1la4iqfc6akcdgglranretjj4p'
                'Session-Token': token
            },
            body: JSON.stringify({
                input: {
                    name: data.name,
                    content: data.content,
                    urgency: data.urgency,
                    priority: data.priority
                }
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2
                flex flex-col items-center">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Título do chamado</FormLabel>
                                <FormControl>
                                    <Input type="Descrição" {...field}
                                        className="w-[600px]"
                                    />
                                </FormControl>
                                {/* <FormDescription>
                                Descrição
                            </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição <span className="fonte-base text-gray-400">(informe também o local onde está o equipamento)</span></FormLabel>
                                <FormControl>
                                    <Textarea {...field}
                                        className="w-[600px] text-black"
                                    />
                                </FormControl>
                                {/* <FormDescription>
                                Descrição
                            </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="urgency"
                        render={({ field }) => (
                            <FormItem className="w-[600px]">
                                <FormLabel>Urgência</FormLabel>
                                <FormControl>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione..." />
                                        </SelectTrigger>
                                        <SelectContent {...field}>
                                            <SelectItem value="1">Muito Baixa</SelectItem>
                                            <SelectItem value="2">Baixa</SelectItem>
                                            <SelectItem value="3">Media</SelectItem>
                                            <SelectItem value="4">Alta</SelectItem>
                                            <SelectItem value="5">Muito Alta</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem className="w-[600px]">
                                <FormLabel>Prioridade</FormLabel>
                                <FormControl>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione..." />
                                        </SelectTrigger>
                                        <SelectContent {...field}>
                                            <SelectItem value="1">Muito Baixa</SelectItem>
                                            <SelectItem value="2">Baixa</SelectItem>
                                            <SelectItem value="3">Media</SelectItem>
                                            <SelectItem value="4">Alta</SelectItem>
                                            <SelectItem value="5">Muito Alta</SelectItem>
                                            <SelectItem value="6">Critica</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Enviar</Button>
                </form>
            </Form>
        </div>
    )
}