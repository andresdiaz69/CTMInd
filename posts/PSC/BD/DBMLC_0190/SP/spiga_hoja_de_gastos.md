# Stored Procedure: spiga_hoja_de_gastos

## Usa los objetos:
- [[spiga_HojasDeGastosEmpleados]]

```sql
CREATE procedure [dbo].[spiga_hoja_de_gastos] 
 @Fecha_inf date,
 @Fecha_sup date
 as
 select CodEmpresa,Empresa,CodCentro,Centro,CodEmpleado,Empleado,
CodConcepto=replace(replace(replace(replace(replace(replace(CodConcepto,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
Concepto=replace(replace(replace(replace(replace(replace(concepto,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
Importe,
FacturaVinculada=replace(replace(replace(replace(replace(replace(FacturaVinculada,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
CodTerceroFactura=replace(replace(replace(replace(replace(replace(CodTerceroFactura,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
TerceroFactura=replace(replace(replace(replace(replace(replace(TerceroFactura,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
FechaGasto,estado,AnticipoVinculado,IdHojasGasto,ImporteAnticipoVinculado
from [PSCService_DB].[dbo].spiga_HojasDeGastosEmpleados
where	convert(datetime,fechagasto,(103))>=@Fecha_Inf
and		convert(datetime,fechagasto,(103))<=@Fecha_sup

```
