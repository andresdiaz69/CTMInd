# View: vw_HojasGasto

## Usa los objetos:
- [[HojasGasto]]
- [[vw_spiga_Empleados]]

```sql




CREATE VIEW [dbo].[vw_HojasGasto] AS
select CodEmpresa,Empresa,CodCentro,Centro,
CodConcepto=replace(replace(replace(replace(replace(replace(CodConcepto,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
Concepto=replace(replace(replace(replace(replace(replace(concepto,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
Importe,FechaGasto,estado,Codempleado,s.IdTerceros,s.NifCif
FROM [192.168.90.10\SPIGAPLUS].[DMS00280].[dbo].[HojasGasto]			h
left join	[DBMLC_0190].dbo.vw_spiga_Empleados	s	on	h.Codempleado = s.IdEmpleados
WHERE convert(DATETIME,fechagasto,(103))>= '20000101'
and convert(DATETIME,fechagasto,(103))<= getdate()
and AnticipoVinculado is null
and estado not in ('Anulado','Rechazado')
and Facturavinculada is null


```
