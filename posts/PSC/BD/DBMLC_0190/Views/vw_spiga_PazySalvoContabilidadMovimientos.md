# View: vw_spiga_PazySalvoContabilidadMovimientos

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]

```sql
CREATE VIEW [dbo].[vw_spiga_PazySalvoContabilidadMovimientos] AS
select IdEmpresas,NombreEmpresa,Centro,NombreCentro,Cuenta,CodigoTercero,Saldo
from(
		select IdEmpresas,NombreEmpresa,Centro,NombreCentro,Cuenta,CodigoTercero,Saldo = sum(Debe)-Sum(Haber)
		from(
				SELECT IdEmpresas,NombreEmpresa,Centro,NombreCentro,Cuenta,FechaAsiento,NumeroAsiento,TipoFactura,concepto,Debe,Haber,CodigoTercero
				FROM [PSCService_db].[dbo].[spiga_ContabilidadMovimientos]
				WHERE IdEmpresas in (1,5,6,22,24)
		) a --where CodigoTercero = 270886
		group by IdEmpresas,NombreEmpresa,Centro,NombreCentro,Cuenta,CodigoTercero
)b where saldo <> 0 

```
