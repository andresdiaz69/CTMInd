# Stored Procedure: sp_prt_CambiosHVEstudios

## Usa los objetos:
- [[gen_paises]]
- [[GTH_Homologacion]]
- [[GTH_ModalidadEstudio]]
- [[rhh_emplea]]
- [[rhh_estudio]]
- [[rhh_portal_emplea]]
- [[rhh_portal_estudio]]
- [[rhh_tbestud]]
- [[rhh_tbinsti]]

```sql


-- =============================================
-- Author:		Alexander Vargas
-- Create date: 24/11/2017
-- Description:	Consulta los estudios actuales y nuevos para ser autorizados
-- Modify by:	Alexander Vargas
-- Modify date: 18/09/2020
-- Description:	Se ajusta validacion de cambios HV para mostrar en el 
--				formulario de autorizacion de HV

-- SPA2021 – 0008  Agregar campos en estudios
-- Modify by:	Alexander Vargas
-- Modify date: 14/01/2021
-- Description:	Se agregan nuevos campos de estudios en la consulta para
--				mostrar que se autoriza
-- SPA2021 – 0008  Agregar campos en estudios
-- Modify by:	Alexander Vargas
-- Modify date: 12/03/2021
-- Description:	Se agrega cons y se quitan los campos ind_estsup y num_sg_act
--				

-- SPA2021 – 0008  Agregar campos en estudios
-- Modify by:	Alexander Vargas
-- Modify date: 06/04/2021
-- Description:	Se agrega mod_est en el UNPIVOT y se
--				incluye la descripción del valor

-- SPA2021 – 0008  Agregar campos en estudios
-- Modify by:	Alexander Vargas
-- Modify date: 06/04/2021
-- Description:	Se agrega filtro por tipo de estudio
--				para mostrar solo los campos del tipo de estudio
--				escogido

-- SPA2021 – 0008  Agregar campos en estudios
-- Modify by:	Alexander Vargas
-- Modify date: 16/04/2021
-- Description:	Se cambia validacion campo cur_act.
--				Se agrega cod_even
--				validacion fec_con

-- SPA2021 – 0008  Agregar campos en estudios
-- Modify by:	Alexander Vargas
-- Modify date: 20/04/2021
-- Description:	ajuste nulo en gra_son y cod_even en llave

-- SPA2021 – 0275  Botones integrantes
-- Modify by:	Alexander Vargas
-- Modify date: 15/06/2021
-- Description:	ajuste para no validar año. Ya no se usa
-- ajustes por pruebas V402

-- Modify by:	Alexander Vargas
-- Modify date: 25/07/2021
-- Description:	ajuste fecha vencimiento
-- ajustes por pruebas V402

-- Modify by:	Alexander Vargas
-- Modify date: 09/08/2021
-- Description:	ajuste descripción del estudio

--SPA2023 - 0139 Campos para homologación de estudios
--Modify by:	Alexander Vargas
--Modify date:	18/03/2023
--Description:	se agregan los siguientes campos a la consulta:
--ndiploma,nacta,nfolio,nlibro,est_exterior,ins_exterior,cod_pais,est_homologa,fec_homologa

--SPA2023 - 0139 Campos para homologación de estudios
--Modify by:	Alexander Vargas
--Modify date:	30/03/2023
--Description:	ajuste por pruebas. se agregan los campos de acuerdo al tipo de estudio
--al final de este procedimiento

--SPA Estado autorizacion HV
--Modified by: Alexander Vargas
--Modified date:	18/04/2023
--Description: se convierten los campos a varchar de 255 para poderlos 
--llamar desde otro procedimiento
-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_CambiosHVEstudios]
    @cod_emp  CHAR(12)   = NULL, 
    @cod_est  CHAR(5)    = NULL, 
    @cod_ins  CHAR(10)   = NULL, 
    @cons     INT        = 1, 
    @cod_even VARCHAR(6) = '0', 
    @opcion   CHAR(30)

--WITH ENCRYPTION	
AS
    BEGIN
        IF(@opcion = 'ModificacionRegistro')
            BEGIN
                SELECT CONVERT(VARCHAR(255),EXT.Descripcion) AS Descripcion, 
                       CONVERT(VARCHAR(255),Nueva.cod_emp) AS cod_emp, 
                       CONVERT(VARCHAR(255),Nueva.campo) AS Campo, 
                       CONVERT(VARCHAR(255),valor_actual) AS valor_actual, 
                       CONVERT(VARCHAR(255),valor_nuevo) AS valor_nuevo
                FROM
                (
                    SELECT DISTINCT 
                           A.cod_emp, 
                           RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', 
                           A.cod_est, 
                           CAST(A.nom_est AS VARCHAR(255)) AS nom_est, 
                           A.nom_est AS des_est, 
                           A.cod_ins, 
                           CAST(D.nom_ins AS VARCHAR(255)) AS nom_ins, 
                           CAST(ISNULL(A.sem_apr, '') AS VARCHAR(255)) AS sem_apr, 
                           CAST(A.hor_est AS VARCHAR(255)) AS hor_est, 
                           CAST(IIF(A.gra_son = 1, '1_Sí', '0_No') AS VARCHAR(255)) AS gra_son, 
                           CAST(ISNULL(FORMAT(A.fec_gra, 'dd/MM/yyyy'), '') AS VARCHAR(255)) AS fec_gra, 
                           CAST(A.nro_tar AS VARCHAR(255)) AS nro_tar, 
                           CAST(A.tip_est AS VARCHAR(255)) AS tip_est, 
                           CAST(A.nom_arch AS VARCHAR(255)) AS nom_arch, 
                           CAST(IIF(A.ind_can = 0, '0_No_Canceló', '1_Canceló') AS VARCHAR(255)) AS ind_can, 
                           CAST(RIGHT(A.arch_soporte, 5) AS VARCHAR(255)) AS arch_soporte, 
                           CAST(ISNULL(A.NRO, '') AS VARCHAR(255)) AS NRO, 
                           CAST(FORMAT(A.fec_ven, 'dd/MM/yyyy') AS VARCHAR(255)) AS fec_ven, 
                           CAST(ISNULL(A.num_act_cons, '') AS VARCHAR(255)) AS num_act_cons, 
                           CAST(ISNULL(IIF(FORMAT(A.fec_cons, 'dd/MM/yyyy') = '01/01/1900', NULL, FORMAT(A.fec_cons, 'dd/MM/yyyy')), '') AS VARCHAR(255)) AS fec_cons, 
                           CAST(IIF(A.cur_act = 1, '1_Sí', '0_No') AS VARCHAR(255)) AS cur_act, 
                           CAST(ISNULL(A.ndiploma, '') AS VARCHAR(255)) AS ndiploma, 
                           CAST(ISNULL(A.nacta, '') AS VARCHAR(255)) AS nacta, 
					  CAST(ISNULL(A.nlibro, '') AS VARCHAR(255)) AS nlibro,
					  CAST(ISNULL(A.nfolio, '') AS VARCHAR(255)) AS nfolio,	
					  CAST(IIF(ISNULL(A.est_exterior, 0) = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS est_exterior, 
					  CAST(ISNULL(A.inst_exterior, '') AS VARCHAR(255)) AS inst_exterior, 
					  CAST(ISNULL(RTRIM(A.cod_pais)+'_'+ pais.nom_pai,'') AS VARCHAR(255)) AS cod_pais,
					  CAST(RTRIM(A.est_homologa)+'_'+ homologa.nom_homologa AS VARCHAR(255)) AS est_homologa, 
					  CAST(ISNULL(FORMAT(A.fec_homologa, 'dd/MM/yyyy'), '') AS VARCHAR(255)) AS fec_homologa, 
                           CAST(IIF(A.mod_est IS NULL, '', CONVERT(VARCHAR(255), A.mod_est) + '_' + modali.des_mod) AS VARCHAR(255)) AS mod_est

                    --===================================
                    FROM rhh_portal_estudio AS A
                         LEFT JOIN rhh_estudio AS E ON A.cod_emp = E.cod_emp
                                                       AND A.cod_est = E.cod_est
                                                       AND A.cod_ins = E.cod_ins
                                                       AND A.cons = E.cons
                                                       AND A.cod_even = E.cod_even
                         INNER JOIN rhh_emplea AS B ON B.cod_emp = A.cod_emp COLLATE DATABASE_DEFAULT
                         LEFT JOIN rhh_tbestud AS C ON C.cod_est = A.cod_est COLLATE DATABASE_DEFAULT
                         LEFT JOIN rhh_tbinsti AS D ON D.cod_ins = A.cod_ins COLLATE DATABASE_DEFAULT
                         LEFT JOIN GTH_ModalidadEstudio AS modali ON modali.mod_est = A.mod_est 
					LEFT JOIN gen_paises pais ON A.cod_pais = pais.cod_pai COLLATE DATABASE_DEFAULT 
					LEFT JOIN GTH_Homologacion homologa ON A.est_homologa = homologa.cod_homologa COLLATE DATABASE_DEFAULT 
                    WHERE A.cod_emp = @cod_emp
                          AND A.cod_est = @cod_est
                          AND A.cod_ins = @cod_ins
                          AND A.cons = @cons
                          AND A.cod_even = @cod_even
                ) AS P UNPIVOT(valor_nuevo FOR campo IN(ind_can, 
                                                        nom_est, 
                                                        nom_ins, 
                                                        sem_apr, 
                                                        hor_est, 
                                                        gra_son, 
                                                        fec_gra, 
                                                        nro_tar, 
                                                        tip_est, 
                                                        arch_soporte, 
                                                        NRO, 
                                                        fec_ven, 
                                                        num_act_cons, 
                                                        fec_cons, 
                                                        mod_est, 
                                                        cur_act, 
                                                        ndiploma, 
                                                        nacta,
											 nlibro,
											 nfolio,
											 est_exterior,
											 inst_exterior,
											 cod_pais,
											 est_homologa,
											 fec_homologa)) AS Nueva
                LEFT JOIN
                (
                    SELECT *
                    FROM
                    (
                        SELECT DISTINCT 
                               A.cod_emp, 
                               RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp',
                               --Campos para comparar con los nuevos
                               E.cod_emp AS 'T.cod_emp', 
                               CAST(ISNULL(E.nom_est, '') AS VARCHAR(255)) AS nom_est, 
                               CAST(ISNULL(A.sem_apr, '') AS VARCHAR(255)) AS sem_apr, 
                               CAST(D.nom_ins AS VARCHAR(255)) AS nom_ins, 
                               CAST(ISNULL(A.hor_est, '') AS VARCHAR(255)) AS hor_est, 
                               CAST(IIF(A.gra_son = 1, '1_Sí', '0_No') AS VARCHAR(255)) AS gra_son, 
                               CAST(ISNULL(FORMAT(E.fec_gra, 'dd/MM/yyyy'), '') AS VARCHAR(255)) AS fec_gra, 
                               CAST(ISNULL(A.nro_tar, '') AS VARCHAR(255)) AS nro_tar, 
                               CONVERT(BIT, E.ind_can) AS 'T.ind_can', 
                               CAST(E.tip_est AS VARCHAR(255)) AS tip_est, 
                               CAST(A.nom_anex AS VARCHAR(255)) AS nom_arch, 
                               CAST(IIF(A.ind_can = 0, '0_No_Canceló', '1_Canceló') AS VARCHAR(255)) AS ind_can, 
                               CAST(IIF(A.fto_certif IS NULL, '', RIGHT(A.fto_certif, 5)) AS VARCHAR(255)) AS arch_soporte, 
                               CAST(ISNULL(E.NRO, '') AS VARCHAR(255)) AS NRO, 
                               CAST(ISNULL(FORMAT(E.fec_ven, 'dd/MM/yyyy'), '') AS VARCHAR(255)) AS fec_ven,

                               CAST(ISNULL(E.num_act_cons, '') AS VARCHAR(255)) AS num_act_cons, 
                               CAST(ISNULL(FORMAT(E.fec_cons, 'dd/MM/yyyy'), '') AS VARCHAR(255)) AS fec_cons, 
                               CAST(IIF(A.cur_act = 1, '1_Sí', '0_No') AS VARCHAR(255)) AS cur_act, 
                               CAST(ISNULL(A.ndiploma, '') AS VARCHAR(255)) AS ndiploma, 
                               CAST(ISNULL(A.nacta, '') AS VARCHAR(255)) AS nacta, 
						 CAST(ISNULL(A.nlibro, '') AS VARCHAR(255)) AS nlibro,
						 CAST(ISNULL(A.nfolio, '') AS VARCHAR(255)) AS nfolio,	
						 CAST(IIF(ISNULL(A.est_exterior, 0) = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS est_exterior, 
						 CAST(ISNULL(A.inst_exterior, '') AS VARCHAR(255)) AS inst_exterior, 
						 CAST(ISNULL(RTRIM(A.cod_pais)+'_'+ pais.nom_pai,'') AS VARCHAR(255)) AS cod_pais,
						 CAST(ISNULL(RTRIM(A.est_homologa)+'_'+ homologa.nom_homologa,'') AS VARCHAR(255)) AS est_homologa, 						 
						 CAST(ISNULL(FORMAT(A.fec_homologa, 'dd/MM/yyyy'), '') AS VARCHAR(255)) AS fec_homologa, 
                               CAST(IIF(E.mod_est IS NULL, '', CONVERT(VARCHAR(255), E.mod_est) + '_' + modali.des_mod) AS VARCHAR(255)) AS mod_est
                        --===================================
                        FROM rhh_estudio AS A
                             LEFT JOIN rhh_estudio AS E ON A.cod_emp = E.cod_emp
                                                           AND A.cod_est = E.cod_est
                                                           AND A.cod_ins = E.cod_ins
                                                           AND A.cons = E.cons
                                                           AND A.cod_even = E.cod_even
                             INNER JOIN rhh_emplea AS B ON B.cod_emp = E.cod_emp COLLATE DATABASE_DEFAULT
                             LEFT JOIN rhh_tbestud AS C ON C.cod_est = E.cod_est COLLATE DATABASE_DEFAULT
                             LEFT JOIN rhh_tbinsti AS D ON D.cod_ins = E.cod_ins COLLATE DATABASE_DEFAULT
                             LEFT JOIN GTH_ModalidadEstudio AS modali ON modali.mod_est = A.mod_est 
					    LEFT JOIN gen_paises pais ON A.cod_pais = pais.cod_pai COLLATE DATABASE_DEFAULT 
					LEFT JOIN GTH_Homologacion homologa ON A.est_homologa = homologa.cod_homologa COLLATE DATABASE_DEFAULT 
                        WHERE A.cod_emp = @cod_emp
                              AND A.cod_est = @cod_est
                              AND A.cod_ins = @cod_ins
                              AND A.cons = @cons
                              AND A.cod_even = @cod_even
                    ) AS P UNPIVOT(valor_actual FOR campo IN(ind_can, 
                                                             nom_est, 
                                                             nom_ins, 
                                                             sem_apr, 
                                                             hor_est, 
                                                             gra_son, 
                                                             fec_gra, 
                                                             nro_tar, 
                                                             tip_est, 
                                                             arch_soporte, 
                                                             NRO, 
                                                             fec_ven, 
                                                             num_act_cons, 
                                                             fec_cons, 
                                                             mod_est, 
												 cur_act, 
												 ndiploma, 
                                                             nacta,
												 nlibro,
												 nfolio,
												 est_exterior,
												 inst_exterior,
												 cod_pais,
												 est_homologa,
												 fec_homologa)) AS Nueva
                ) AS Actual ON Actual.campo = Nueva.CAMPO
                INNER JOIN
                (
                    SELECT c.name AS Campo, 
                           value AS Descripcion
                    FROM sys.extended_properties AS ep
                         INNER JOIN sys.tables AS t ON ep.major_id = t.object_id
                         INNER JOIN sys.columns AS c ON ep.major_id = c.object_id
                                                        AND ep.minor_id = c.column_id
                    WHERE class = 1
                          AND t.name = 'rhh_estudio'
                ) AS EXT ON Nueva.campo = EXT.Campo
                WHERE valor_actual <> valor_nuevo;

            END;
            ELSE
            BEGIN
                IF(@opcion = 'B')--Borrar datos de la tabla de Portal, rhh_portal_emplea
                    BEGIN
                        DELETE FROM rhh_portal_emplea
                        WHERE cod_emp = @cod_emp;
                    END;
            END;
        IF(@opcion = 'NuevoRegistro')
            BEGIN
                WITH CamposEstudio
                     AS (SELECT CONVERT(VARCHAR(255),EXT.Descripcion) AS Descripcion, 
						  CONVERT(VARCHAR(255),Nueva.cod_emp) AS cod_emp, 
						  CONVERT(VARCHAR(255),Nueva.campo) AS Campo, 
						  CONVERT(VARCHAR(255),valor_actual) AS valor_actual, 
						  CONVERT(VARCHAR(255),valor_nuevo) AS valor_nuevo
                         FROM
                         (
                             SELECT A.cod_emp, 
                                    RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', 
                                    A.cod_est, 
                                    CAST(A.nom_est AS VARCHAR(255)) AS nom_est, 
                                    A.nom_est AS des_est, 
                                    A.cod_ins, 
                                    CAST(D.nom_ins AS VARCHAR(255)) AS nom_ins, 
                                    CAST(A.ano_est AS VARCHAR(255)) AS 'ano_est', 
                                    CAST(A.sem_apr AS VARCHAR(255)) AS sem_apr, 
							 CAST(IIF(A.mod_est IS NULL, '', CONVERT(VARCHAR(255), A.mod_est) + '_' + modali.des_mod) AS VARCHAR(255)) AS mod_est,
                                    CAST(A.hor_est AS VARCHAR(255)) AS hor_est, 
                                    CAST(IIF(A.gra_son = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS gra_son, 
                                    CAST(FORMAT(A.fec_gra, 'dd/MM/yyyy') AS VARCHAR(255)) AS fec_gra, 
                                    CAST(ISNULL(A.nro_tar, '') AS VARCHAR(255)) AS nro_tar, 
                                    CAST(A.tip_est AS VARCHAR(255)) AS tip_est, 
                                    CAST(A.nom_arch AS VARCHAR(255)) AS nom_arch, 
                                    CAST(IIF(A.ind_can = 0, '0_No_Canceló', '1_Canceló') AS VARCHAR(255)) AS ind_can, 
                                    CAST(ISNULL(A.NRO, '') AS VARCHAR(255)) AS NRO, 
                                    CAST(FORMAT(A.fec_ven, 'dd/MM/yyyy') AS VARCHAR(255)) AS fec_ven, 
                                    CAST(ISNULL(A.num_act_cons, '') AS VARCHAR(255)) AS num_act_cons, 
                                    CAST(FORMAT(A.fec_cons, 'dd/MM/yyyy') AS VARCHAR(255)) AS fec_cons, 
                                    CAST(IIF(ISNULL(A.cur_act, 0) = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS cur_act, 
                                    CAST(ISNULL(A.ndiploma, '') AS VARCHAR(255)) AS ndiploma, 
                                    CAST(ISNULL(A.nacta, '') AS VARCHAR(255)) AS nacta,
							 CAST(ISNULL(A.nlibro, '') AS VARCHAR(255)) AS nlibro,
							 CAST(ISNULL(A.nfolio, '') AS VARCHAR(255)) AS nfolio,	
							 CAST(IIF(ISNULL(A.est_exterior, 0) = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS est_exterior, 
							 CAST(ISNULL(A.inst_exterior, '') AS VARCHAR(255)) AS inst_exterior, 
							 CAST(ISNULL(RTRIM(A.cod_pais)+'_'+ pais.nom_pai,'') AS VARCHAR(255)) AS cod_pais,
							 CAST(RTRIM(A.est_homologa)+'_'+ homologa.nom_homologa AS VARCHAR(255)) AS est_homologa, 
							 CAST(ISNULL(FORMAT(A.fec_homologa, 'dd/MM/yyyy'), '') AS VARCHAR(255)) AS fec_homologa, 						 
                                    --Campos para comparar con los nuevos
                                    E.cod_emp AS 'T.cod_emp', 
                                    E.nom_est AS 'T.des_est', 
                                    E.ano_est AS 'T.ano_est', 
                                    E.sem_apr AS 'T.sem_apr', 
                                    E.hor_est AS 'T.hor_est', 
                                    E.gra_son AS 'T.gra_son', 
                                    E.fec_gra AS 'T.fec_gra', 
                                    e.nro_tar AS 'T.nro_tar', 
                                    CONVERT(BIT, E.ind_can) AS 'T.ind_can', 
                                    E.tip_est AS 'T.tip_est', 
                                    E.nom_anex AS 'T.nom_arch'
                             --===================================
                             FROM rhh_portal_estudio A
                                  LEFT JOIN rhh_estudio E ON A.cod_emp = E.cod_emp
                                                             AND A.cod_est = E.cod_est
                                                             AND A.cod_ins = E.cod_ins
                                                             AND A.cons = E.cons
                                                             AND A.cod_even = E.cod_even
                                  INNER JOIN rhh_emplea B ON B.cod_emp = A.cod_emp COLLATE DATABASE_DEFAULT
                                  LEFT JOIN rhh_tbestud C ON C.cod_est = A.cod_est COLLATE DATABASE_DEFAULT
                                  LEFT JOIN rhh_tbinsti D ON D.cod_ins = A.cod_ins COLLATE DATABASE_DEFAULT
						    LEFT JOIN gen_paises pais ON A.cod_pais = pais.cod_pai COLLATE DATABASE_DEFAULT 
						    LEFT JOIN GTH_ModalidadEstudio AS modali ON modali.mod_est = A.mod_est 
						    LEFT JOIN GTH_Homologacion homologa ON A.est_homologa = homologa.cod_homologa COLLATE DATABASE_DEFAULT 
                             WHERE A.cod_emp = @cod_emp
                                   AND A.cod_est = @cod_est
                                   AND A.cod_ins = @cod_ins
                                   AND A.cons = @cons
                                   AND A.cod_even = @cod_even
                         ) P UNPIVOT(valor_nuevo FOR campo IN(nom_est, 
                                                              ind_can, 
                                                              nom_ins, 
                                                              ano_est, 
                                                              sem_apr, 
												  mod_est,
                                                              hor_est, 
                                                              gra_son, 
                                                              fec_gra, 
                                                              nro_tar, 
                                                              tip_est, 
                                                              NRO, 
                                                              fec_ven, 
                                                              num_act_cons, 
                                                              fec_cons, 
                                                              cur_act, 
                                                              ndiploma, 
                                                              nacta,
												  nlibro,
												  nfolio,
												  est_exterior,
												  inst_exterior,
												  cod_pais,
												  est_homologa,												  
												  fec_homologa)) AS Nueva
                         LEFT JOIN
                         (
                             SELECT *
                             FROM
                             (
                                 SELECT A.cod_emp, 
                                        RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp',
                                        --Campos para comparar con los nuevos
                                        E.cod_emp AS 'T.cod_emp', 
                                        CAST(ISNULL(E.nom_est, '') AS VARCHAR(255)) AS nom_est, 
                                        CAST(E.ano_est AS VARCHAR(255)) AS ano_est, 
                                        CAST(E.sem_apr AS VARCHAR(255)) AS sem_apr, 
                                        CAST(D.nom_ins AS VARCHAR(255)) AS nom_ins, 
                                        CAST(E.hor_est AS VARCHAR(255)) AS hor_est, 
                                        CAST(IIF(E.gra_son = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS gra_son, 
                                        CAST(FORMAT(E.fec_gra, 'dd/MM/yyyy') AS VARCHAR(255)) AS fec_gra, 
                                        CAST(A.nro_tar AS VARCHAR(255)) AS nro_tar, 
                                        CONVERT(BIT, E.ind_can) AS 'T.ind_can', 
                                        CAST(E.tip_est AS VARCHAR(255)) AS tip_est, 
                                        CAST(A.nom_anex AS VARCHAR(255)) AS nom_arch, 
                                        CAST(IIF(A.ind_can = 0, '0_No_Canceló', '1_Canceló') AS VARCHAR(255)) AS ind_can, 
                                        CAST(ISNULL(E.NRO, '') AS VARCHAR(255)) AS NRO, 
                                        CAST(FORMAT(E.fec_ven, 'dd/MM/yyyy') AS VARCHAR(255)) AS fec_ven, 
                                        CAST(ISNULL(E.num_act_cons, '') AS VARCHAR(255)) AS num_act_cons, 
                                        CAST(IIF(ISNULL(E.cur_act, 0) = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS cur_act, 
                                        CAST(ISNULL(A.ndiploma, '') AS VARCHAR(255)) AS ndiploma, 
                                        CAST(ISNULL(A.nacta, '') AS VARCHAR(255)) AS nacta, 
								CAST(ISNULL(A.nlibro, '') AS VARCHAR(255)) AS nlibro,
								CAST(ISNULL(A.nfolio, '') AS VARCHAR(255)) AS nfolio,	
								CAST(IIF(ISNULL(A.est_exterior, 0) = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS est_exterior, 
								CAST(ISNULL(A.inst_exterior, '') AS VARCHAR(255)) AS inst_exterior, 
								CAST(ISNULL(RTRIM(A.cod_pais)+'_'+ pais.nom_pai,'') AS VARCHAR(255)) AS cod_pais,
								CAST(RTRIM(A.est_homologa)+'_'+ homologa.nom_homologa AS VARCHAR(255)) AS est_homologa, 
								CAST(ISNULL(FORMAT(A.fec_homologa, 'dd/MM/yyyy'), '') AS VARCHAR(255)) AS fec_homologa, 
                                        CAST(FORMAT(E.fec_cons, 'dd/MM/yyyy') AS VARCHAR(255)) AS fec_cons,
								CAST(IIF(E.mod_est IS NULL, '', CONVERT(VARCHAR(255), E.mod_est) + '_' + modali.des_mod) AS VARCHAR(255)) AS mod_est 
                                 --===================================
                                 FROM rhh_estudio A
                                      LEFT JOIN rhh_estudio E ON A.cod_emp = E.cod_emp
                                                                 AND A.cod_est = E.cod_est
                                                                 AND A.cod_ins = E.cod_ins
                                                                 AND A.cons = E.cons
                                                                 AND A.cod_even = E.cod_even
                                      INNER JOIN rhh_emplea B ON B.cod_emp = E.cod_emp COLLATE DATABASE_DEFAULT
                                      LEFT JOIN rhh_tbestud C ON C.cod_est = E.cod_est COLLATE DATABASE_DEFAULT
                                      LEFT JOIN rhh_tbinsti D ON D.cod_ins = E.cod_ins COLLATE DATABASE_DEFAULT 
							   LEFT JOIN gen_paises pais ON A.cod_pais = pais.cod_pai COLLATE DATABASE_DEFAULT 
							   LEFT JOIN GTH_ModalidadEstudio AS modali ON modali.mod_est = A.mod_est 
							   LEFT JOIN GTH_Homologacion homologa ON A.est_homologa = homologa.cod_homologa COLLATE DATABASE_DEFAULT 
                                 WHERE A.cod_emp = @cod_emp
                                       AND A.cod_est = @cod_est
                                       AND A.cod_ins = @cod_ins
                                       AND A.cons = @cons
                                       AND A.cod_even = @cod_even
                             ) P UNPIVOT(valor_actual FOR campo IN(nom_est, 
                                                                   ind_can, 
                                                                   nom_ins, 
                                                                   ano_est, 
                                                                   sem_apr, 
													  mod_est,
                                                                   hor_est, 
                                                                   gra_son, 
                                                                   fec_gra, 
                                                                   nro_tar, 
                                                                   tip_est, 
                                                                   NRO, 
                                                                   fec_ven, 
                                                                   num_act_cons, 
                                                                   fec_cons, 
                                                                   cur_act, 
                                                                   ndiploma, 
                                                                   nacta,
													  nlibro,
													  nfolio,
													  est_exterior,
													  inst_exterior,
													  cod_pais,
													  est_homologa,													  
													  fec_homologa)) AS TA2
                         ) AS Actual ON Actual.campo = Nueva.CAMPO
                                    AND Actual.valor_actual <> Nueva.valor_nuevo
                         INNER JOIN
                         (
                             SELECT c.name AS Campo, 
                                    value AS Descripcion
                             FROM sys.extended_properties AS ep
                                  INNER JOIN sys.tables AS t ON ep.major_id = t.object_id
                                  INNER JOIN sys.columns AS c ON ep.major_id = c.object_id
                                                                 AND ep.minor_id = c.column_id
                             WHERE class = 1
                                   AND t.name = 'rhh_estudio'
                         ) AS EXT ON Nueva.campo = EXT.Campo)
                     
				 SELECT * INTO #t_NuevoEstudio FROM CamposEstudio;

                DECLARE @TIPOEST VARCHAR(2);

                SELECT @TIPOEST = tipo_est FROM rhh_portal_estudio
                WHERE cod_emp = @cod_emp
                      AND cod_est = @cod_est
                      AND cod_ins = @cod_ins
                      AND cons = @cons
                      AND cod_even = @cod_even;

                PRINT(@TIPOEST);


                IF @TIPOEST = '01'
                    BEGIN
                        SELECT * FROM #t_NuevoEstudio
                        WHERE campo IN('nom_est', 'mod_est','sem_apr', 'gra_son', 'fec_gra', 'ind_can', 'nro_tar', 'cur_act',
				    'ndiploma','nacta','nlibro','nfolio','est_exterior','inst_exterior','cod_pais','est_homologa','fec_homologa'); 				    
                    END;
                IF @TIPOEST = '02'
                    BEGIN
                        SELECT * FROM #t_NuevoEstudio
                        WHERE campo IN('nom_est','mod_est', 'hor_est', 'fec_gra', 'fec_ven','est_exterior','inst_exterior','cod_pais','est_homologa','fec_homologa');
                    END;
                IF @TIPOEST = '03'
                    BEGIN
                        SELECT * FROM #t_NuevoEstudio
                        WHERE campo IN('nom_est','mod_est', 'hor_est', 'fec_gra', 'nro', 'fec_ven');
                    END;
                IF @TIPOEST = '04'
                    BEGIN
                        SELECT * FROM #t_NuevoEstudio
                        WHERE campo IN('nom_est', 'mod_est', 'hor_est','fec_gra', 'nro', 'fec_ven', 'num_act_cons', 'fec_cons');
                    END;
            END;
    END;

```
