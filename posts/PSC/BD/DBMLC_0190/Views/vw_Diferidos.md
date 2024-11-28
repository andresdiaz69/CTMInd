# View: vw_Diferidos

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]

```sql
Create view vw_Diferidos as
select IdEmpresas,         NombreEmpresa, Cuenta,      CodigoTercero,      FechaAsiento,
       ReferenciaInterna,  Debe,          Haber,       saldo=(Debe-Haber), concepto,
	   Centro,             NombreCentro,  referencia  
  from [PSCService_DB].dbo.spiga_ContabilidadMovimientos
 where cuenta like '17%'
   and year(FechaAsiento)= 2023
```
