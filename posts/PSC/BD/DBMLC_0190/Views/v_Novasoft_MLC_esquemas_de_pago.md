# View: v_Novasoft_MLC_esquemas_de_pago

## Usa los objetos:
- [[v_esquemas_por_cargo]]
- [[v_Novasoft_devengados_por_cargo]]

```sql


CREATE view [dbo].[v_Novasoft_MLC_esquemas_de_pago] as
select distinct Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,Codigo_Compañia,Nombre_Compañia,codigo_marca,nombre_marca,codigo_centro,nombre_centro,
salario_variable,Salario_Basico,[Bono Canasta],[Bono Gasolina],[Auxilio de Celular],[Auxilio de Movilizacion],[Salario Garantizado],
Esquema1 = max(Esquema1),Esquema2= max(Esquema2),Esquema3=max(Esquema3),Esquema4 = max(Esquema4),Esquema5= max(Esquema5),Esquema6=max(Esquema6)
from(	
		select distinct cedula,Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,Codigo_Compañia,Nombre_Compañia,codigo_marca,nombre_marca,codigo_centro,nombre_centro,
		salario_variable,Salario_Basico,[Bono Canasta]= isnull([Bono Canasta],0),[Bono Gasolina]=isnull([Bono Gasolina],0),
		[Auxilio de Celular]= isnull([Auxilio de Celular],0),[Auxilio de Movilizacion]= isnull([Auxilio de Movilizacion],0),
		[Salario Garantizado]= isnull([Salario Garantizado],0),Esquema1,Esquema2,Esquema3,Esquema4,Esquema5,Esquema6
		from (
			select v.cedula,
			v.Codigo_Cargo,v.Nombre_Cargo,v.Codigo_Cargo_Generico,v.Nombre_Cargo_generico,v.Codigo_Compañia,v.Nombre_Compañia,v.codigo_marca,v.nombre_marca,v.codigo_centro,v.nombre_centro,
			v.salario_variable,v.Salario_Basico,[Bono Canasta]= isnull(v.[Bono Canasta],0),[Bono Gasolina]=isnull(v.[Bono Gasolina],0),
			[Auxilio de Celular]= isnull(v.[Auxilio de Celular],0),[Auxilio de Movilizacion]= isnull(v.[Auxilio de Movilizacion],0),
			[Salario Garantizado]= isnull(v.[Salario Garantizado],0),Esquema1=isnull(resultado.Esquema1,''),Esquema2= isnull(resultado.Esquema2,''),
			Esquema3= isnull(resultado.Esquema3,''),Esquema4= isnull(resultado.Esquema4,''),Esquema5= isnull(resultado.Esquema5,''),
			Esquema6= isnull(resultado.Esquema6,'')
			from v_Novasoft_devengados_por_cargo	v
			outer apply
			(
				select Esquema1,Esquema2,Esquema3,Esquema4,Esquema5,Esquema6
				from v_esquemas_por_cargo	n
				where v.Codigo_Cargo = n.CodigoCargo and v.Codigo_Compañia = n.CodigoEmpresa and v.codigo_marca = n.Cod_Marca and v.codigo_centro = n.codigocentro and 
				n.codigoempleado = v.cedula 
			) resultado
		--where Codigo_Cargo = 190
		--and codigo_marca = 19
		--and codigo_centro = 12
		)a
		--where Codigo_Cargo = 190
		--and codigo_marca = 19
		--and codigo_centro = 12
) b group by cedula,Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,Codigo_Compañia,Nombre_Compañia,codigo_marca,nombre_marca,codigo_centro,nombre_centro,
salario_variable,Salario_Basico,[Bono Canasta],[Bono Gasolina],[Auxilio de Celular],[Auxilio de Movilizacion],[Salario Garantizado]


```
