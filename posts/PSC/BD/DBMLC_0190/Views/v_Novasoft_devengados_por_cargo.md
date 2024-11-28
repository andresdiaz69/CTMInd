# View: v_Novasoft_devengados_por_cargo

## Usa los objetos:
- [[v_Novasoft_Beneficios]]
- [[v_Novasoft_Novedades_fijas]]
- [[v_Novasoft_Salario_basico]]

```sql
CREATE view [dbo].[v_Novasoft_devengados_por_cargo] as
select  cedula,Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,Codigo_Compañia,Nombre_Compañia,codigo_marca,nombre_marca,codigo_centro,nombre_centro,
Salario_Basico,salario_variable,[Bono Canasta],[Bono Gasolina],fijos.[Auxilio de Celular],fijos.[Auxilio de Movilizacion],fijos.[Salario Garantizado]
from (
		select  cedula,Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,Codigo_Compañia,Nombre_Compañia,codigo_marca,nombre_marca,codigo_centro,nombre_centro,
		Salario_Basico,salario_variable,
		resultado.[Bono Canasta],resultado.[Bono Gasolina]
		from v_Novasoft_Salario_basico		b
		outer apply 
		(
			select  cod_emp,[Bono Canasta],[Bono Gasolina] 
			from v_Novasoft_Beneficios	n
			where b.Codigo_Cargo = n.Codigo_Cargo and b.Codigo_Compañia = n.Codigo_Compañia and b.codigo_marca = n.codigo_marca and b.codigo_centro = n.codigo_centro
			and b.cedula = n.cod_emp and n.Codigo_Cargo_Generico = b.Codigo_Cargo_Generico
		) resultado
) c	
outer apply
(
	select cod_emp,[Auxilio de Celular],[Auxilio de Movilizacion],[Salario Garantizado]
	from v_Novasoft_Novedades_fijas	f
	where	c.Codigo_Cargo = f.Codigo_Cargo and c.Codigo_Compañia = f.Codigo_Compañia and c.codigo_marca = f.codigo_marca 
			and c.codigo_centro = f.codigo_centro and f.cod_emp = c.cedula and f.Codigo_Cargo_Generico = c.Codigo_Cargo_Generico
) fijos

--where  Codigo_Cargo = 106
--and codigo_marca = 19
----and codigo_centro = 12



```
