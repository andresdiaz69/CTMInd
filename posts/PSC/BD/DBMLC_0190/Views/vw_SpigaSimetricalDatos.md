# View: vw_SpigaSimetricalDatos

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]

```sql
CREATE VIEW [dbo].[vw_SpigaSimetricalDatos] AS
select idEmpresas Empresa,YEAR(FechaAsiento) Año,Month(FechaAsiento) Mes ,FechaAsiento,Cuenta,Centro CentroCosto,NombreCentro,
	CONVERT(decimal(18,4), Haber-Haber) SaldoInicial,
	CONVERT(decimal(18,4), Debe) Debitos,
	CONVERT(decimal(18,4), Haber) Creditos,
	CONVERT(decimal(18,4), Debe-Haber) Saldo,
	'' Naturaleza,'' TipoCuenta,'' Descripcion,
	CONVERT(decimal(18,4), Debe-Debe) ModDebito, 
	CONVERT(decimal(18,4), Haber-Haber) ModCredito,
	CONVERT(decimal(18,4), Debe) FinDebito, 
	CONVERT(decimal(18,4), Haber) FinCredito,
	CONVERT(date,DATEADD(dd,-(DAY(DATEADD(mm,1,​FechaAsiento))),DATEADD(mm,1,​FechaAsiento)),105) Fecha
	from PSCService_DB.dbo.spiga_ContabilidadMovimientos 
	where  Cuenta is not null
		and Cuenta < '699999'
		and idEmpresas in (1,3,19)
		and (Centro in (147,8,7,11,27,70,58,60) 
			or (Centro = 28 and Seccion in (597,598))
			or (Centro = 69 and Seccion in (606))
			or (Centro = 54 and Seccion in (614))
			or (Centro = 146 and Seccion in (878))
			or (Centro = 146 and Seccion in (1095))
		)


```
