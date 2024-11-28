# View: vw_Presupuestos_Lineas

## Usa los objetos:
- [[Empresas]]
- [[Presupuestos_LineasMayorista]]
- [[UnidadDeNegocio]]

```sql
CREATE VIEW [dbo].[vw_Presupuestos_Lineas]
 AS
--****************************
--Autor: Manuel Suarez
-- Date: 07/10/2024
--Descr: Alter VW para proyecto presupuestos se agrega la tabla por la donde esta mayorista y se filtra para que no salga la unidaddenegocio 700

--Autor: Manuel Suarez
-- Date: 12/11/2024
--Descr: Alter VW para proyecto presupuestos se agrega la tabla de empresas y se agregan los campos codempresa y nombreempresa

--Autor: Manuel Suarez
-- Date: 13/11/2024
--Descr: Alter VW para proyecto presupuestos se filtarn por cada empresa las lineas que se estan manejando para presupuestos.

--Autor: Wilder Chacón
-- Date: 13/11/2024
--Descr: Alter VW para proyecto presupuestos se agregan las colunas de empresas agrupadar para clasificar las lineas en los consolidados.
--****************************

SELECT  x.CodEmpresa,		x.NombreEmpresa,		x.Codigo_Linea, 
		x.Nombre_Linea,		
		CASE WHEN  x.Codigo_Linea = 417 OR x.Codigo_Linea = 23
			 THEN  1
			 --WHEN  x.Codigo_Linea = 4 OR x.Codigo_Linea = 418
			 --THEN  0
			 ELSE  x.CodEmpresa
			 END	CodEmpresaAgrupada,
		CASE WHEN  x.Codigo_Linea = 417 OR x.Codigo_Linea = 23
			 THEN  'Casatoro'
			 --WHEN  x.Codigo_Linea = 4 OR x.Codigo_Linea = 418
			 --THEN  0
			 ELSE  x.NombreEmpresa
			 END	NombreEmpresaAgrupada	


FROM 
	(
		select a.CodEmpresa,e.NombreEmpresa,a.CodUnidadNegocio Codigo_Linea, a.NombreUnidadNegocio Nombre_Linea
		  from [DBMLC_0190].[dbo].[UnidadDeNegocio] a
		  left join [DBMLC_0190]..Empresas e on e.CodigoEmpresa = a.CodEmpresa
		 where CodEmpresa in( 1 )
		   and CodUnidadNegocio not in (700,15,5,417)     
		 group by a.CodEmpresa,e.NombreEmpresa,a.CodUnidadNegocio , a.NombreUnidadNegocio 

		  union all
		  select a.CodEmpresa,e.NombreEmpresa,a.CodUnidadNegocio Codigo_Linea, a.NombreUnidadNegocio Nombre_Linea
		  from [DBMLC_0190].[dbo].[UnidadDeNegocio] a
		  left join [DBMLC_0190]..Empresas e on e.CodigoEmpresa = a.CodEmpresa
		 where CodEmpresa in(  6)
		   and CodUnidadNegocio not in (700,15,5,7,417)     
		 group by a.CodEmpresa,e.NombreEmpresa,a.CodUnidadNegocio , a.NombreUnidadNegocio 
		 union all
		select a.CodEmpresa,e.NombreEmpresa,a.CodUnidadNegocio Codigo_Linea, a.NombreUnidadNegocio Nombre_Linea
		  from [DBMLC_0190].[dbo].[UnidadDeNegocio] a
		  left join [DBMLC_0190]..Empresas e on e.CodigoEmpresa = a.CodEmpresa
		 where CodEmpresa in(  5)
		   and CodUnidadNegocio  in (417)     
		 group by a.CodEmpresa,e.NombreEmpresa,a.CodUnidadNegocio , a.NombreUnidadNegocio 
		 union all
		select a.CodEmpresa,e.NombreEmpresa,a.CodUnidadNegocio Codigo_Linea, a.NombreUnidadNegocio Nombre_Linea
		  from [DBMLC_0190].[dbo].[UnidadDeNegocio] a
		  left join [DBMLC_0190]..Empresas e on e.CodigoEmpresa = a.CodEmpresa
		 where CodEmpresa in(  24)
		   and CodUnidadNegocio  in (23)     
		 group by a.CodEmpresa,e.NombreEmpresa,a.CodUnidadNegocio , a.NombreUnidadNegocio 
		 union all
		 select b.CodEmpresa,e.NombreEmpresa,CodmarcaPresupuestos, NombreMarcaPresupuestos 
		   from [dbo].[Presupuestos_LineasMayorista] b
		   left join [DBMLC_0190]..Empresas e on e.CodigoEmpresa = b.CodEmpresa

	) x
   

```
