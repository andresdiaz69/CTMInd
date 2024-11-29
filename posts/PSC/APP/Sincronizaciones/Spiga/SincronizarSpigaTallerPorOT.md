## Variables

FechaCorte: (Fecha actual menos 3 días)

## Proceso

1. Se obtiene lista de Tabla [[APP/posts/PSC/BD/DBMLC_0190/Tables/Empresas|Empresas]] (DBMLC_0190) (Where ActivarLiquidacion == true)
2. Se recorre la lista:
	1. Se consulta SP [[Comisiones_Taller_PorOT]] (DMS90280) por cada Empresa
		Parámetros:

| Param                                   | Value                     |
| --------------------------------------- | ------------------------- |
| @idEmpresas int                         | CodigoEmpresa             |
| @IdCentros smallint=null                | null                      |
| @FechaFacturaTrabajoDesde datetime=null | 1 día mes FechaCorte      |
| @FechaFacturaTrabajohasta datetime=null | Último día mes FechaCorte |

3. Elimina los registros antiguos (DBMLC_0190): 
	Ejecuta query quemado (mismos parámetros paso anterior)
```sql
DELETE FROM ComisionesSpigaTallerPorOT WHERE Ano_Periodo = " + Ano_Periodo + " AND Mes_Periodo = " + Mes_Periodo + " AND CodigoEmpresa = " + CodigoEmpresa + "
```
4. Inserta información en tabla [[ComisionesSpigaTallerPorOT]] (DBMLC_0190)
 
 
 

 

