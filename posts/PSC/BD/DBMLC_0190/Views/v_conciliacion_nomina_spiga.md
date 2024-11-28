# View: v_conciliacion_nomina_spiga

## Usa los objetos:
- [[spiga_ConceptosNovasoft]]
- [[spiga_ContabilidadMovimientos]]
- [[spiga_PUC]]

```sql
CREATE view [dbo].[v_conciliacion_nomina_spiga] as
SELECT distinct idEmpresas,NombreEmpresa,cuenta,NombreCuenta = p.Nombre,
CodigoTercero,FechaAsiento,NumeroAsiento,Factura,FechaFactura,TipoFactura,ReferenciaInterna,
concepto=replace(replace(replace(replace(replace(replace(concepto,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''), 
FacturaConciliacion, ExpedienteConciliacion, Centro, 
NombreCentro=replace(replace(replace(replace(replace(replace(NombreCentro,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''), 
Seccion, 
NombreSeccion=replace(replace(replace(replace(replace(replace(NombreSeccion,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''), 
Departamento, 
NombreDepartamento=replace(replace(replace(replace(replace(replace(NombreDepartamento,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''), 
IdCtaBancarias, 
CuentaBancaria=replace(replace(replace(replace(replace(replace(CuentaBancaria,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
Marca, 
NombreMarca=replace(replace(replace(replace(replace(replace(NombreMarca,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''), 
centroAux, 
NombreCentroAux=replace(replace(replace(replace(replace(replace(NombreCentroAux,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),  
SeccionAux, 
NombreSeccionAux=replace(replace(replace(replace(replace(replace(NombreSeccionAux,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''), 
DepartamentoAux, 
NombreDepartamentoAux=replace(replace(replace(replace(replace(replace(NombreDepartamentoAux,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
Debe,Haber
FROM		[PSCService_DB].[dbo].[spiga_ContabilidadMovimientos]	c
--left join	[DBMLC_0190].dbo.v_spiga_PUC			p	on	c.cuenta COLLATE DATABASE_DEFAULT = p.codigocuenta
left join	[PSCService_DB].dbo.spiga_PUC			p	on	c.cuenta = p.CodigoCuenta
--join		[Novasoft_CT_MM].dbo.[V_rhh_concep]		v	on	(c.concepto = substring(nom_con,1,30) or c.concepto = 'Inc' or c.concepto = 'Aporte Caja Compensacion' 
join		[PSCService_DB].dbo.[spiga_ConceptosNovasoft]		v	on	(c.concepto = substring(nom_con,1,30) or c.concepto = 'Inc' or c.concepto = 'Aporte Caja Compensacion' 
																or c.concepto = 'Aportes I' or c.concepto = 'Apropiacion SENA' or c.concepto = 'Dcto Plan Com' 
																or c.concepto = 'Dcto Pensiones Vol' or c.concepto = 'Pension Vol' or (c.cuenta = '2380300510' and c.concepto like '%Decreto%'))
WHERE TipoFactura is null
and TipoAsiento = 'NO' -- BY JCS
and FechaAsiento >= '20220101' and Cuenta <> '2505951005' and idEmpresas in (1,5,6,22) -- BY JCS
--IdEmpresas in (1)
--and year(FechaAsiento)= 2020
--and month(FechaAsiento) = 7


```
