# View: vw_spiga_ContabilidadMovimientos

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]

```sql
CREATE VIEW [dbo].[vw_spiga_ContabilidadMovimientos]
AS
SELECT        IdSincronizacionSpiga, IdConsecutivo, Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas, NombreEmpresa, Cuenta, CodigoTercero, FechaAsiento, NumeroAsiento, Factura, FechaFactura, TipoFactura, ReferenciaInterna, 
                         Debe, Haber, concepto, FacturaConciliacion, ExpedienteConciliacion, Centro, NombreCentro, Seccion, NombreSeccion, Departamento, NombreDepartamento, IdCtaBancarias, CuentaBancaria, Marca, NombreMarca, centroAux, 
                         NombreCentroAux, SeccionAux, NombreSeccionAux, DepartamentoAux, NombreDepartamentoAux
FROM            [PSCService_DB].dbo.spiga_ContabilidadMovimientos
```
